package com.CT553.demo.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class SportCenterResponse {
    private Long id;
    private String name;
    private String address;
    private String description;
    private Long userId;
    private List<CourtResponse> courts;
}
