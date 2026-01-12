package com.CT553.demo.dto.request;

import com.CT553.demo.entity.SportCenter;
import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;

}
