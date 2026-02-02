package com.CT553.demo.dto.response;

import com.CT553.demo.entity.enums.AuthProvider;
import com.CT553.demo.entity.enums.Role;
import lombok.Data;

import java.util.Date;

@Data
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private String firstName;
    private String lastName;
    private AuthProvider provider;
    private String providerId;
    private Boolean enabled;
    private Role role;
    private Date createAt;
}
