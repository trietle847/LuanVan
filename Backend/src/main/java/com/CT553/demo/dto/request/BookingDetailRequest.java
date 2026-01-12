package com.CT553.demo.dto.request;

import lombok.Data;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Data
public class BookingDetailRequest {
    private Date date;
    private Long courtId;
    private LocalTime start;
    private LocalTime end;
//    private List<Long> slotTimes;
    private List<BookingProductRequest> products;
}
