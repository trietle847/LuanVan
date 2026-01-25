package com.CT553.demo.dto.response;

import lombok.Data;

import java.util.Date;
@Data
public class ImageResponse {
    private Long id;
    private Long courtId;
    private String url;
    private String name;
    private Date createAt;
}
