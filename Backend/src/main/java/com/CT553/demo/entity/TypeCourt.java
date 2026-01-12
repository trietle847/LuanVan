package com.CT553.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "typeCourt")
@Data
public class TypeCourt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;


    @OneToMany(mappedBy = "typeCourt",fetch = FetchType.LAZY)
    private List<Court> courts;

    @OneToMany(mappedBy = "typeCourt", fetch = FetchType.LAZY)
    private List<PriceConfig> priceConfigs;

}
