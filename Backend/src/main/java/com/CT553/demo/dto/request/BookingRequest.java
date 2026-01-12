package com.CT553.demo.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class BookingRequest {
    private Long userId;
    private List<BookingDetailRequest> bookingDetails;
}
