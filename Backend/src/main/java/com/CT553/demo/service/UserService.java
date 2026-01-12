package com.CT553.demo.service;

import com.CT553.demo.dto.request.UserRequest;
import com.CT553.demo.dto.response.UserResponse;
import com.CT553.demo.entity.User;
import com.CT553.demo.entity.enums.AuthProvider;
import com.CT553.demo.exception.ApiException;
import com.CT553.demo.mapper.UserMapper;
import com.CT553.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.CT553.demo.entity.enums.Role.USER;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException(BAD_REQUEST, "Email already exists");
        }

        AuthProvider provider = request.getProvider();

        User user = userMapper.toEntity(request);
        user.setProvider(provider);
        user.setEnabled(true);
        user.setRole(USER);

//        if (provider == AuthProvider.LOCAL) {
//            if (request.getPassword() == null || request.getPassword().isBlank()) {
//                throw new ApiException(BAD_REQUEST, "Password is required");
//            }
            user.setPassword(passwordEncoder.encode(request.getPassword()));
//        } else {
//            user.setPassword(null);
//        }

        user = userRepository.save(user);
        return userMapper.toResponse(user);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .toList();
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ApiException(BAD_REQUEST,"user not found"));
        return userMapper.toResponse(user);
    }

    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id).orElseThrow(() -> new ApiException(BAD_REQUEST,"user not found"));
        userMapper.updateUser(user, userRequest);
        return userMapper.toResponse(userRepository.save(user));
    }

    public UserResponse getMe() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new ApiException(BAD_REQUEST,"user not found")
                );
        return userMapper.toResponse(user);
    }
}
