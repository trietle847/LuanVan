package com.CT553.demo.service;

import com.CT553.demo.dto.request.BookingProductRequest;
import com.CT553.demo.dto.response.BookingProductResponse;
import com.CT553.demo.entity.BookingProduct;
import com.CT553.demo.mapper.BookingProductMapper;
import com.CT553.demo.repository.BookingProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookingProductService {
    private final BookingProductRepository bookingProductRepository;
    private final BookingProductMapper bookingProductMapper;

    public BookingProductResponse createBookingProduct(BookingProductRequest request) {
        BookingProduct bookingProduct = bookingProductMapper.toEntity(request);
        return  bookingProductMapper.toResponse(bookingProductRepository.save(bookingProduct));
    }
}
