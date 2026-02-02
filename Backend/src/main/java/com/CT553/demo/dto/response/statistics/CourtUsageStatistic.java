package com.CT553.demo.dto.response.statistics;

import lombok.Data;

@Data
public class CourtUsageStatistic {
    private Integer month;
    private Integer year;
    private Long courtId;
    private String courtName;
    private Long totalBooking;
}
