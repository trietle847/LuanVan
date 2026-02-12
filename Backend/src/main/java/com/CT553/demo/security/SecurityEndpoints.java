package com.CT553.demo.security;

public final class SecurityEndpoints {
    private SecurityEndpoints () {}

    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/auth/login",
            "/user",
    };

    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/user/**",
            "/type/**",
            "/court/**",
            "/product/**"
    };

    public static final String[] ADMIN_ENDPOINTS = {
            "/user/**"
    };
}
