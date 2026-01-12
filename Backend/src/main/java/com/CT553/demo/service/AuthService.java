package com.CT553.demo.service;

import com.CT553.demo.dto.request.LoginRequest;
import com.CT553.demo.dto.response.LoginResponse;
import com.CT553.demo.entity.User;
import com.CT553.demo.exception.ApiException;
import com.CT553.demo.repository.UserRepository;
import com.CT553.demo.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"user not found"));

        if (!passwordEncoder.matches(
                request.getPassword(), user.getPassword())) {
            throw new ApiException(BAD_REQUEST,"Invalid username or password");
        }

        String token = jwtUtils.generateToken(user.getUsername(), user.getRole().name());

        return LoginResponse.builder()
                .token(token)
                .username(user.getUsername())
                .role(user.getRole().name())
                .expiresAt(System.currentTimeMillis() + 86400000)
                .build();
    }
}
