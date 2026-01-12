package com.CT553.demo.service;

import com.CT553.demo.dto.request.BookingDetailRequest;
import com.CT553.demo.dto.request.BookingProductRequest;
import com.CT553.demo.dto.request.BookingRequest;
import com.CT553.demo.dto.response.BookingResponse;
import com.CT553.demo.entity.*;
import com.CT553.demo.exception.ApiException;
import com.CT553.demo.mapper.BookingDetailMapper;
import com.CT553.demo.mapper.BookingMapper;
import com.CT553.demo.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final BookingDetailRepository bookingDetailRepository;
    private final ProductRepository productRepository;
    private final CourtRepository courtRepository;
    private final UserRepository userRepository;

    private final BookingDetailMapper bookingDetailMapper;
    private final BookingMapper bookingMapper;

    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        Booking booking = new Booking();
        booking.setCreateAt(new Date());
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("not found user")
                );
        booking.setUser(user);
        bookingRepository.save(booking);

        List<BookingDetail> bookingDetails = new ArrayList<>();

        Double totalPrice = 0.0;

        for (BookingDetailRequest bdReq : request.getBookingDetails()) {
            Double detailAmount = 0.0;

            BookingDetail detail =  bookingDetailMapper.toEntity(bdReq);
            detail.setBooking(booking);
            detail.setCourt(courtRepository.findById(bdReq.getCourtId())
                    .orElseThrow(() -> new ApiException(BAD_REQUEST,"court not found")));
            detail = bookingDetailRepository.save(detail);

            List<BookingProduct> bookingProducts = new ArrayList<>();

            for (BookingProductRequest bpReq : bdReq.getProducts()) {
                BookingProduct bp = new BookingProduct();
                bp.setBookingDetail(detail);
                Product product = productRepository.findById(bpReq.getProductId())
                        .orElseThrow(() -> new ApiException(BAD_REQUEST,"product not found"));
                bp.setProduct(product);
                bp.setQuantity(bpReq.getQuantity());
              // tính tiền
                detailAmount += bpReq.getQuantity()*product.getPrice();
                System.out.println("tiền của từng sp "+ detailAmount);
                // cập nhật số lượng bên product trong kho
                product.setQuantity(product.getQuantity() - bpReq.getQuantity());

                bookingProducts.add(bp);
            }
            totalPrice += detailAmount;
            System.out.println("Tổng tiền là " + totalPrice);
            detail.setBookingProducts(bookingProducts);
            bookingDetails.add(detail);
        }
        booking.setTotalAmount(totalPrice);
        booking.setBookingDetails(bookingDetails);
//        bookingRepository.save(booking);
        return bookingMapper.toResponse(booking);

    }
}
