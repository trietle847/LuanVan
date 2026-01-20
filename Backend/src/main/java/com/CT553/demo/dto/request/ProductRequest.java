package com.CT553.demo.dto.request;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private Integer stock;
    private Double price;
    private String description;
    private Long categoryId;
}
