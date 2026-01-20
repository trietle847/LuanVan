package com.CT553.demo.service;

import com.CT553.demo.dto.request.BookingDetailRequest;
import com.CT553.demo.dto.request.BookingProductRequest;
import com.CT553.demo.dto.response.BookingDetailResponse;
import com.CT553.demo.dto.response.ProductResponse;
import com.CT553.demo.entity.BookingDetail;
import com.CT553.demo.entity.BookingProduct;
import com.CT553.demo.entity.Court;
import com.CT553.demo.entity.Product;
import com.CT553.demo.exception.ApiException;
import com.CT553.demo.mapper.BookingDetailMapper;
import com.CT553.demo.mapper.BookingProductMapper;
import com.CT553.demo.mapper.ProductMapper;
import com.CT553.demo.repository.BookingDetailRepository;
import com.CT553.demo.repository.CourtRepository;
import com.CT553.demo.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    private final ProductMapper productMapper;

    public BookingDetailResponse createBookingDetail(BookingDetailRequest request) {
        BookingDetail bookingDetail = bookingDetailMapper.toEntity(request);

        System.out.println(request);

        Court court = courtRepsitory.findById(request.getCourtId())
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"court not found"));
        bookingDetail.setCourt(court);

        bookingDetail = bookingDetailRepository.save(bookingDetail);


        List<BookingProduct> bookingProducts = new ArrayList<>();

        for (BookingProductRequest pr : request.getProducts()) {
            BookingProduct bp = bookingProductMapper.toEntity(pr);
            bp.setBookingDetail(bookingDetail);
            bp.setProduct(
                    productRepository.findById(pr.getProductId())
                        .orElseThrow(() -> new ApiException(BAD_REQUEST,"product not found")));
            bookingProducts.add(bp);
        }

        bookingDetail.setBookingProducts(bookingProducts);
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
}
