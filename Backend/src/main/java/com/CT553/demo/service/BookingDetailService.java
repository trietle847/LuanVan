package com.CT553.demo.service;

import com.CT553.demo.dto.request.BookingDetailRequest;
import com.CT553.demo.dto.request.BookingProductRequest;
import com.CT553.demo.dto.response.BookingDetailResponse;
import com.CT553.demo.entity.*;
import com.CT553.demo.entity.enums.BookingStatus;
import com.CT553.demo.exception.ApiException;
import com.CT553.demo.mapper.BookingDetailMapper;
import com.CT553.demo.mapper.BookingProductMapper;
import com.CT553.demo.mapper.PriceConfigMapper;
import com.CT553.demo.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class BookingDetailService {
    private final BookingDetailRepository bookingDetailRepository;
    private final BookingDetailMapper bookingDetailMapper;
    private final BookingProductMapper bookingProductMapper;
    private final CourtRepository courtRepsitory;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PriceConfigMapper priceConfigMapper;

    private final PriceConfigRepsitory priceConfigRepsitory;

//    private void attachCourtAndUser(BookingDetail bookingDetail, Long courtId, Long userId) {
//        Court court = courtRepsitory.findById(courtId)
//                .orElseThrow(() -> new ApiException(BAD_REQUEST, "court not found"));
//        bookingDetail.setCourt(court);
//
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("user not found"));
//        if (userId != null) {
//            User user = userRepository.findById(userId)
//                            .orElseThrow(() -> new RuntimeException("user not found"));
//            bookingDetail.setUser(user);
//        }
//    }

    private double calculateCourtFee(Court court, Date date, LocalTime start, LocalTime end) {
        LocalDate localDate = date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        DayOfWeek dayOfWeek = localDate.getDayOfWeek();

        int dayBit = switch (dayOfWeek) {
            case MONDAY -> 1;
            case TUESDAY -> 2;
            case WEDNESDAY -> 4;
            case THURSDAY -> 8;
            case FRIDAY -> 16;
            case SATURDAY -> 32;
            case SUNDAY -> 64;
        };

        List<PriceConfig> configs = priceConfigRepsitory
                .findByTypeCourtId(court.getTypeCourt().getId())
                .stream().filter(pc -> (pc.getDays() & dayBit) != 0)
                .toList();

        double feeCourt = 0;
        for (PriceConfig pc : configs) {
            LocalTime from = start.isAfter(pc.getStartTime()) ? start : pc.getStartTime();
            LocalTime to = end.isBefore(pc.getEndTime()) ? end : pc.getEndTime();
            if (from.isBefore(to)) {
                long minutes = Duration.between(from, to).toMinutes();
                feeCourt += (minutes / 60.0) * pc.getPrice();
            }
        }
        return feeCourt;
    }

    private double attachProductsAndCalculateFee(BookingDetail bookingDetail, List<BookingProductRequest> products) {
        if (products == null || products.isEmpty()) return 0;

        double feeService = 0;
        List<BookingProduct> bookingProducts = new ArrayList<>();

        for (BookingProductRequest pr : products) {
            Product product = productRepository.findById(pr.getProductId())
                    .orElseThrow(() -> new ApiException(BAD_REQUEST, "product not found"));

            BookingProduct bp = bookingProductMapper.toEntity(pr);
            bp.setProduct(product);
            bp.setBookingDetail(bookingDetail);

            feeService += product.getPrice() * pr.getQuantity();
            bookingProducts.add(bp);
        }

        bookingDetail.setBookingProducts(bookingProducts);
        return feeService;
    }

    @Transactional
    public BookingDetailResponse createBookingDetail(BookingDetailRequest request) {
        BookingDetail bookingDetail = bookingDetailMapper.toEntity(request);
        bookingDetail.setCreateAt(new Date());
        bookingDetail.setStatus(BookingStatus.BOOK);

        Court court = courtRepsitory.findById(request.getCourtId())
                .orElseThrow(() -> new ApiException(BAD_REQUEST, "court not found"));
        bookingDetail.setCourt(court);

        if (request.getUserId() != null) {
            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new RuntimeException("user not found"));
            bookingDetail.setUser(user);
            bookingDetail.setGuestName(null);
            bookingDetail.setGuestPhone(null);
        }
        else {
            bookingDetail.setUser(null);
            bookingDetail.setGuestPhone(request.getGuestPhone());
            bookingDetail.setGuestName(request.getGuestName());
        }

        double feeCourt = 0.0;
        if (request.getEnd() != null) {
            feeCourt = calculateCourtFee(bookingDetail.getCourt(), request.getDate(), request.getStart(), request.getEnd());
        }
        bookingDetail.setFeeCourt(feeCourt);

        double feeService = attachProductsAndCalculateFee(bookingDetail, request.getProducts());
        bookingDetail.setFeeService(feeService);

//        bookingDetail.setTotalAmount(feeCourt + feeService);

        return bookingDetailMapper.toResponse(bookingDetailRepository.save(bookingDetail));
    }

    public List<BookingDetailResponse> getAllBookingDetail() {
        return bookingDetailRepository.findAll()
                .stream()
                .map(bookingDetailMapper::toResponse)
                .toList();
    }

    public List<BookingDetailResponse> getByCourtId(Long courtId) {
        List<BookingDetail>  bookingDetails = bookingDetailRepository.findByCourt_Id(courtId);
        return bookingDetails
                .stream()
                .map(bookingDetailMapper::toResponse)
                .toList();
    }

    public BookingDetailResponse updateBookingDetail(Long id, BookingDetailRequest request) {
        BookingDetail bookingDetail = bookingDetailRepository.findById(id)
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"bookingDetail not found"));

        if (request.getDate() != null)
            bookingDetail.setDate(request.getDate());

        if (request.getCourtId() != null) {
            Court court = courtRepsitory.findById(request.getCourtId())
                    .orElseThrow(() -> new ApiException(BAD_REQUEST,"court not found"));
            bookingDetail.setCourt(court);
        }

        if (request.getStart() != null)
            bookingDetail.setStart(request.getStart());

        if (request.getEnd() != null)
            bookingDetail.setEnd(request.getEnd());

        if (request.getProducts() != null && !request.getProducts().isEmpty()) {
            updateBookingProduct(bookingDetail.getId(), request.getProducts());
        }

        // Tính lại tiền sân
        double feeCourt = calculateCourtFee(
                bookingDetail.getCourt(),
                bookingDetail.getDate(),
                bookingDetail.getStart(),
                bookingDetail.getEnd()
        );
        bookingDetail.setFeeCourt(feeCourt);

        // Tính lại tiền dịch vụ từ DB
        double feeService = bookingDetail.getBookingProducts()
                .stream()
                .mapToDouble(bp -> bp.getProduct().getPrice() * bp.getQuantity())
                .sum();

        bookingDetail.setFeeService(feeService);

//        bookingDetail.setTotalAmount(feeCourt + feeService);

        return bookingDetailMapper.toResponse(bookingDetailRepository.save(bookingDetail));
    }

    public BookingDetailResponse updateBookingProduct(Long id, List<BookingProductRequest> requests) {
        BookingDetail bookingDetail = bookingDetailRepository.findById(id)
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"BookingDetail not found"));

        for (BookingProductRequest pr : requests) {
            BookingProduct existing = bookingDetail.getBookingProducts().stream()
                    .filter(bp -> bp.getProduct().getId().equals(pr.getProductId()))
                    .findFirst()
                    .orElse(null);
            if (existing != null) {
                // đã mua rồi, cộng thêm số lượng
                existing.setQuantity(existing.getQuantity() + pr.getQuantity());
            } else {
                // tạo dòng
                BookingProduct bp = bookingProductMapper.toEntity(pr);
                bp.setBookingDetail(bookingDetail);
                bp.setProduct(productRepository.findById(pr.getProductId())
                        .orElseThrow(() -> new ApiException(BAD_REQUEST, "product not found")));
                bookingDetail.getBookingProducts().add(bp);
            }
        }
        return bookingDetailMapper.toResponse(bookingDetailRepository.save(bookingDetail));
    }

    @Transactional
    public void deleteBookingDetail(Long bookingDetailId) {
        BookingDetail bookingDetail = bookingDetailRepository.findById(bookingDetailId)
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"BookingDetail not found"));
        for (BookingProduct bp: bookingDetail.getBookingProducts()) {
            Product p = bp.getProduct();
            p.setStock(p.getStock() + bp.getQuantity());
            productRepository.save(p);
        }
        bookingDetailRepository.delete(bookingDetail);
    }

    public List<BookingDetailResponse> getMyBookingDetail() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException(BAD_REQUEST, "User not found"));

        return bookingDetailRepository.findByUserId(user.getId())
                .stream()
                .map(bookingDetailMapper::toResponse)
                .toList();
    }

}
