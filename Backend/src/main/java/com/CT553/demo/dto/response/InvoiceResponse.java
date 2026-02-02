package com.CT553.demo.dto.response;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class InvoiceResponse {
    private Long id;
    private String name;
    private Double totalAmount;
    private Date createAt;
    private List<BookingDetailResponse> bookingDetailResponses;
}
