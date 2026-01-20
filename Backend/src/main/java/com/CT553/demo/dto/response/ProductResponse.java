package com.CT553.demo.dto.response;

import lombok.Data;

@Data
public class ProductResponse {
    private Long id;
    private String name;
    private Integer quantity;
    private Double price;
    private String description;
    private Long categoryId;
}
