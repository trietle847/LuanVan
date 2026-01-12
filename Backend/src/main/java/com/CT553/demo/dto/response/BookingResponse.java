package com.CT553.demo.dto.response;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class BookingResponse {
    private Long id;
    private Long userId;
    private Date createAt;
    private Double totalAmount;
    private List<BookingDetailResponse> bookingDetails;
}
