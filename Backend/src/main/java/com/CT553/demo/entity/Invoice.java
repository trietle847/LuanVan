package com.CT553.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double totalAmount;
    private Date createAt;

    @OneToMany(mappedBy = "invoice", fetch = FetchType.LAZY)
    private List<BookingDetail> bookingDetails;
}
