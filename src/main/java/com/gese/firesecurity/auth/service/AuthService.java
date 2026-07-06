package com.gese.firesecurity.auth.service;

import com.gese.firesecurity.auth.dto.*;
import com.gese.firesecurity.auth.entity.RefreshToken;
import com.gese.firesecurity.auth.entity.Role;
import com.gese.firesecurity.auth.entity.User;
import com.gese.firesecurity.auth.repository.RefreshTokenRepository;
import com.gese.firesecurity.auth.repository.UserRepository;
import com.gese.firesecurity.common.security.JwtTokenProvider;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final RefreshTokenRepository refreshTokenRepo;
    private final JwtTokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.jwt.refresh-expiration-days}")
    private int refreshExpirationDays;

    @Transactional
    public AuthResponse login(LoginRequest request) {
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Email hoặc mật khẩu không đúng"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Email hoặc mật khẩu không đúng");
        }

        if (!user.isActive()) {
            throw new BadCredentialsException("Tài khoản đã bị vô hiệu hóa");
        }

        return generateTokens(user);
    }

    @Transactional
    public AuthResponse refresh(RefreshTokenRequest request) {
        RefreshToken stored = refreshTokenRepo
                .findByTokenAndRevokedFalseAndExpiresAtAfter(request.getRefreshToken(), LocalDateTime.now())
                .orElseThrow(() -> new BadCredentialsException("Refresh token không hợp lệ hoặc đã hết hạn"));

        stored.setRevoked(true);
        refreshTokenRepo.save(stored);

        User user = stored.getUser();
        return generateTokens(user);
    }

    @Transactional
    public void logout(String refreshToken) {
        refreshTokenRepo.revokeByToken(refreshToken);
    }

    @Transactional
    public User createUser(CreateUserRequest request) {
        if (userRepo.existsByEmail(request.getEmail())) {
            throw new IllegalStateException("Email đã tồn tại");
        }

        User user = User.builder()
                .email(request.getEmail())
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? request.getRole() : Role.editor)
                .build();

        return userRepo.save(user);
    }

    public User getProfile(Long userId) {
        return userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User không tồn tại"));
    }

    private AuthResponse generateTokens(User user) {
        String accessToken = tokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole().name());

        String refreshToken = UUID.randomUUID().toString();
        refreshTokenRepo.save(RefreshToken.builder()
                .token(refreshToken)
                .user(user)
                .expiresAt(LocalDateTime.now().plusDays(refreshExpirationDays))
                .build());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(AuthResponse.UserInfo.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .name(user.getName())
                        .role(user.getRole().name())
                        .build())
                .build();
    }
}
