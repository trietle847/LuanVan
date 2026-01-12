package com.CT553.demo.controller;

import com.CT553.demo.dto.request.BookingDetailRequest;
import com.CT553.demo.dto.request.BookingProductRequest;
import com.CT553.demo.dto.response.BookingDetailResponse;
import com.CT553.demo.dto.response.BookingProductResponse;
import com.CT553.demo.service.BookingDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/booking-detail")
public class BookingDetailController {
    @Autowired
    private BookingDetailService bookingDetailService;

    @PostMapping
    public BookingDetailResponse createBookingDetail(@RequestBody BookingDetailRequest request) {
        return bookingDetailService.createBookingDetail(request);
    }

    @PutMapping("/{id}")
    public BookingDetailResponse updateBookingDetail(@PathVariable Long id, @RequestBody BookingDetailRequest request){
        return bookingDetailService.updateBookingDetail(id, request);
    }
}
