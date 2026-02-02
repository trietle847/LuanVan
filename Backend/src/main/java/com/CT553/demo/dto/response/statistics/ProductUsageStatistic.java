package com.CT553.demo.dto.response.statistics;

import lombok.Data;

@Data
public class ProductUsageStatistic {
    private Long productId;
    private Long totalQuantity;
    private String Name;
    private Integer month;
    private Integer year;
}
