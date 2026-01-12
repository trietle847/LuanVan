package com.CT553.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "sportCenter")
@Data
public class SportCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private String description;

    @OneToMany(
            mappedBy = "sportCenter",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Court> courts;

    @OneToMany(
            mappedBy = "sportCenter",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<CategoryService> categoryServices;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
