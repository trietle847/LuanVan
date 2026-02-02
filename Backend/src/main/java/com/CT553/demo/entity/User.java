package com.CT553.demo.entity;

import com.CT553.demo.entity.enums.AuthProvider;
import com.CT553.demo.entity.enums.Role;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    private String password;
    private String phone;
    private String firstName;
    private String lastName;
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;
    private String providerId;
    private Boolean enabled;
    @Enumerated(EnumType.STRING)
    private Role role;
    private Date createAt;

    @OneToMany(
            mappedBy = "user",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    private List<SportCenter> sportCenters;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookingDetail> bookingDetails;
}
