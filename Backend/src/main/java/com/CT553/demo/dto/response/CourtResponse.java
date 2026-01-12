package com.CT553.demo.dto.response;

import lombok.Data;

@Data
public class CourtResponse {
    private Long id;
    private String name;
    private String description;
    private Long sportCenterId;
    private Long typeCourtId;
}
