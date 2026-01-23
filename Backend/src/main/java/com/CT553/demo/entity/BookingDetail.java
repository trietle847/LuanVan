package com.CT553.demo.entity;

import com.CT553.demo.entity.enums.BookingStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "bookingDetail")
@Data
public class BookingDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;
    private LocalTime start;
    private LocalTime end;
    private Date createAt;
    private Double totalAmount;
    private BookingStatus status;

    @ManyToOne
    @JoinColumn(name = "court_id")
    private Court court;

    @OneToMany(mappedBy = "bookingDetail", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookingProduct> bookingProducts;

//    @ManyToOne
//    @JoinColumn(name = "booking_id")
//    @JsonIgnore
//    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
