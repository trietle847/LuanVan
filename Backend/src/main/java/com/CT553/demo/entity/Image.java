package com.CT553.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "image")
@Data
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String publicId;
    private String url;
    private String name;
    private Date createAt;

    @ManyToOne
    @JoinColumn(name = "court_id")
    private Court court;
}
