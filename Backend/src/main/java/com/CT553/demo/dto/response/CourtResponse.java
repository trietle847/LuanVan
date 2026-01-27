package com.CT553.demo.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class CourtResponse {
    private Long id;
    private String name;
    private String description;
    private Long sportCenterId;
    private Long typeCourtId;
    private List<ImageResponse> images;
}
