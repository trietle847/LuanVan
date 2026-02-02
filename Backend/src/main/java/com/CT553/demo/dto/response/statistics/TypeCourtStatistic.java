package com.CT553.demo.dto.response.statistics;

import lombok.Data;

@Data
public class TypeCourtStatistic {
    private Integer typeCourtId;
    private String typeCourtName;
    private Integer totalBooking;
    private Integer month;
    private Integer year;
}
