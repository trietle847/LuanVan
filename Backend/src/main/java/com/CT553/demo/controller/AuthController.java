package com.CT553.demo.controller;

import com.CT553.demo.dto.request.LoginRequest;
import com.CT553.demo.dto.response.LoginResponse;
import com.CT553.demo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        System.out.println(request);

        return authService.login(request);
    }
}
