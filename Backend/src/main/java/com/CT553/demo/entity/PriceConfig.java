package com.CT553.demo.entity;

import com.CT553.demo.entity.enums.DayOfWeek;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "priceConfig")
@Data
public class PriceConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer days;
    private LocalTime startTime;
    private LocalTime endTime;
    private Double price;
    private Boolean isPeak;

    @ManyToOne
    @JoinColumn(name = "type_Court_id")
    private TypeCourt typeCourt;
}
