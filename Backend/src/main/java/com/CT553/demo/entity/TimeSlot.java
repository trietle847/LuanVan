package com.CT553.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "timeSlot")
@Data
public class TimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    private Date date;
    private Time startTimeSlot;
    private Time endTimeSlot;
    private boolean isAvailable;

    @ManyToOne
    @JoinColumn(name = "cour_id")
    private Court court;

//    @ManyToOne
//    @JoinColumn(name = "bookingDetailId")
//    private BookingDetail bookingDetail;
}
