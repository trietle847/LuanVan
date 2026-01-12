package com.CT553.demo.dto.response;

import lombok.Data;

import java.sql.Time;

@Data
public class TimeSlotResponse {
    private Long id;
    private Time startTimeSlot;
    private Time endTimeSlot;
//    private Boolean isAvailable;
    private Long courtId;
}
