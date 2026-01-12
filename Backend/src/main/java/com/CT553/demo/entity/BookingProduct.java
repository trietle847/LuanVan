package com.CT553.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "booking_product")
@Data
public class BookingProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "bookingDetail_id")
    @JsonIgnore
    private BookingDetail bookingDetail;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
