package com.CT553.demo.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class InvoiceRequest {
    private String name;
    private List<Long> bookingDetailIds;
}
