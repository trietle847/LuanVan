package com.CT553.demo.dto.request;

import com.CT553.demo.entity.enums.DayOfWeek;
import lombok.Data;

import java.sql.Time;
import java.util.List;

@Data
public class PriceConfigRequest {
    private List<Integer> days;
    private Time startTime;
    private Time endTime;
    private Double price;
    private Boolean isPeak;
    private Long typeCourtId;
}
