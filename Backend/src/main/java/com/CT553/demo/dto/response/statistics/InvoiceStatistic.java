package com.CT553.demo.dto.response.statistics;

import lombok.Data;

@Data
public class InvoiceStatistic {
    private Integer month;
    private Integer year;
    private Long totalInvoice;
    private double totalRevenue;
}
