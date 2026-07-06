package com.gese.firesecurity.auth.repository;

import com.gese.firesecurity.auth.entity.Role;
import com.gese.firesecurity.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findByRole(Role role);
}
