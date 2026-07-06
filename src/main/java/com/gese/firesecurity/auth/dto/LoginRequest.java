package com.gese.firesecurity.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {

    @Schema(example = "admin@gesefiresecurity.vn")
    @NotBlank @Email
    private String email;

    @Schema(example = "Admin@123")
    @NotBlank @Size(min = 6)
    private String password;
}
