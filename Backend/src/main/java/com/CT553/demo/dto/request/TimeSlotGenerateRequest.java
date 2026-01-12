package com.CT553.demo.dto.request;

import lombok.Data;

import java.time.LocalTime;

@Data
public class TimeSlotGenerateRequest {
    private LocalTime start;
    private LocalTime end;
    private int stepMinutes;
    private Long courtId;
}
