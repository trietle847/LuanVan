package com.CT553.demo.dto.response;

import com.CT553.demo.dto.request.BookingProductRequest;
import com.CT553.demo.entity.enums.BookingStatus;
import lombok.Data;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Data
public class BookingDetailResponse {
    private Long id;
    private Date date;
    private Long courtId;
    private Long userId;
    private LocalTime start;
    private LocalTime end;
    private Date createAt;
//    private Double totalAmount;
    private Double feeCourt;
    private Double feeService;
    private BookingStatus status;
    private String guestName;
    private String guestPhone;
//    private List<Long> slotTimes;
    private List<BookingProductResponse> products;
}
