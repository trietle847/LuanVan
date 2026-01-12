package com.CT553.demo.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class SportCenterRequest {
    private String name;
    private String address;
    private String description;
    private Long userId;
//    private List<CourtRequest> courts;
}
