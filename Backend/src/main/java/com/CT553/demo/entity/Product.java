package com.CT553.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "product")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer quantity;
    private Double price;
    private String description;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private CategoryService service;

//    @ManyToOne
//    @JoinColumn(name = "bookingDetail_id")
//    private BookingDetail bookingDetail;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<BookingProduct> bookingProducts;
}
