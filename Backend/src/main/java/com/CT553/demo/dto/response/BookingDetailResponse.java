package com.CT553.demo.dto.response;

import com.CT553.demo.dto.request.BookingProductRequest;
import lombok.Data;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Data
public class BookingDetailResponse {
    private Long id;
    private Date date;
    private Long courtId;
    private LocalTime start;
    private LocalTime end;
//    private List<Long> slotTimes;
    private List<BookingProductResponse> products;
}
