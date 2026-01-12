package com.CT553.demo.dto.request;

import com.CT553.demo.entity.enums.AuthProvider;
import com.CT553.demo.entity.enums.Role;
import lombok.Data;

@Data
public class UserRequest {
    private String username;
    private String email;
    private String password;
    private String phone;
    private String firstName;
    private String lastName;
    private AuthProvider provider;
    private String providerId;
    private Boolean enabled;
    private Role role;
}
