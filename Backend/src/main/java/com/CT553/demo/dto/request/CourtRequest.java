package com.CT553.demo.dto.request;

import lombok.Data;

@Data
public class CourtRequest {
    private String name;
    private String description;
    private Long sportCenterId;
    private Long typeCourtId;
}
