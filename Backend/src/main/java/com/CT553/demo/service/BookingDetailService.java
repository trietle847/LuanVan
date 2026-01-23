package com.CT553.demo.service;

import com.CT553.demo.dto.request.BookingDetailRequest;
import com.CT553.demo.dto.request.BookingProductRequest;
//import com.CT553.demo.dto.request.BookingRequest;
import com.CT553.demo.dto.response.BookingDetailResponse;
import com.CT553.demo.dto.response.PriceConfigResponse;
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

    @Transactional
    public List<BookingDetailResponse> createBookingDetail(List<BookingDetailRequest> requests) {
        List<BookingDetailResponse> responses = new ArrayList<>();

        for (BookingDetailRequest request: requests) {
            BookingDetail bookingDetail = bookingDetailMapper.toEntity(request);

            Court court = courtRepsitory.findById(request.getCourtId())
                    .orElseThrow(() -> new ApiException(BAD_REQUEST, "court not found"));
            bookingDetail.setCourt(court);

            bookingDetail = bookingDetailRepository.save(bookingDetail);

            bookingDetail.setCreateAt(new Date());
            bookingDetail.setStatus(BookingStatus.BOOK);

//            thêm id người dùng
            String username = SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() ->
                            new RuntimeException("user not find")
                    );
            bookingDetail.setUser(user);

//        tính tiền sân theo giờ
//  ------------------------------------------------------------------
//      lấy ngày hiện tại kiểm tra thứ mấy
            LocalDate localDate = request.getDate()
                    .toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
            DayOfWeek dayOfWeek = localDate.getDayOfWeek();
            System.out.println("Thứ " + dayOfWeek);

            int dayBit = switch (dayOfWeek) {
                case MONDAY -> 1;      // T2
                case TUESDAY -> 2;     // T3
                case WEDNESDAY -> 4;   // T4
                case THURSDAY -> 8;    // T5
                case FRIDAY -> 16;     // T6
                case SATURDAY -> 32;  // T7
                case SUNDAY -> 64;    // CN
            };

//        lọc giá theo thứ
            List<PriceConfig> configs = priceConfigRepsitory.findByTypeCourtId(court.getTypeCourt().getId())
                    .stream().filter(pc -> (pc.getDays() & dayBit) != 0).toList();
            System.out.println(" danh sách giá tiền theo ngày hôm đó " + priceConfigMapper.toResponse(configs));

//        Tính tiền
            LocalTime start = request.getStart();
            LocalTime end = request.getEnd();

            double feeCourt = 0;

            for (PriceConfig pc : configs) {
                LocalTime pcStart = pc.getStartTime();
                LocalTime pcEnd = pc.getEndTime();

                LocalTime from = start.isAfter(pcStart) ? start : pcStart;
                LocalTime to = end.isBefore(pcEnd) ? end : pcEnd;

                if (from.isBefore(to)) {
                    long minutes = Duration.between(from, to).toMinutes();
                    double hours = minutes / 60.0;
                    feeCourt += hours * pc.getPrice();
                }
            }

            System.out.println("tổng tiền " + feeCourt);
//        System.out.println("thể loại sân "+ court.getTypeCourt().getId());
//
//        List<PriceConfig> priceConfigs = priceConfigRepsitory.findByTypeCourtId(court.getTypeCourt().getId());
//
//        System.out.println("thông tin giá tiền theo loại sân" + priceConfigMapper.toResponse((priceConfigs)));

// -------------------------------------------------------------
            List<BookingProduct> bookingProducts = new ArrayList<>();

            Double feeService = 0.0;
            for (BookingProductRequest pr : request.getProducts()) {
                BookingProduct bp = bookingProductMapper.toEntity(pr);
                Product product = productRepository.findById(pr.getProductId())
                        .orElseThrow(() -> new ApiException(BAD_REQUEST, "product not found"));
                feeService += product.getPrice() * pr.getQuantity();
                System.out.println("tổng giá của sản phẩm " + product.getName() + " : " + product.getPrice() * pr.getQuantity());
                bp.setBookingDetail(bookingDetail);
//            bp.setProduct(
//                    productRepository.findById(pr.getProductId())
//                        .orElseThrow(() -> new ApiException(BAD_REQUEST,"product not found")));
                bp.setProduct(product);
                bookingProducts.add(bp);
            }

            bookingDetail.setTotalAmount(feeService + feeCourt);
            bookingDetail.setBookingProducts(bookingProducts);
            bookingDetailRepository.save(bookingDetail);
            responses.add(bookingDetailMapper.toResponse(bookingDetail));
//            return bookingDetailMapper.toResponse(bookingDetailRepository.save(bookingDetail));
        }
        return responses;
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

        if (request.getDate() != null) {
            bookingDetail.setDate(request.getDate());
        }

        if (request.getCourtId() != null) {
            Court court = courtRepsitory.findById(request.getCourtId())
                    .orElseThrow(() -> new ApiException(BAD_REQUEST,"court not found"));
            bookingDetail.setCourt(court);
        }

        if (request.getStart() != null){
            bookingDetail.setStart(request.getStart());
        }

        if (request.getEnd() != null) {
            bookingDetail.setEnd(request.getEnd());
        }

        if (request.getProducts() != null && !request.getProducts().isEmpty()) {
            updateBookingProduct(bookingDetail.getId(),request.getProducts());
        }

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
