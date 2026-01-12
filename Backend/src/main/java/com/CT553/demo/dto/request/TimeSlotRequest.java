package com.CT553.demo.dto.request;

import lombok.Data;

import java.sql.Time;

@Data
public class TimeSlotRequest {
    private Time startTimeSlot;
    private Time endTimeSlot;
    private Boolean isAvailable;
    private Long courtId;
}
