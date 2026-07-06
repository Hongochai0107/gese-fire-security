package com.gese.firesecurity.lead.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateLeadRequest {

    @Schema(example = "Nguyễn Văn A")
    @NotBlank @Size(max = 255)
    private String name;

    @Schema(example = "0912345678")
    @NotBlank
    @Pattern(regexp = "^[0-9]{9,11}$", message = "Số điện thoại không hợp lệ")
    private String phone;

    @Email(message = "Email không hợp lệ")
    private String email;

    @Size(max = 255)
    private String company;

    @Size(max = 2000)
    private String message;

    @Size(max = 255)
    private String service;

    @Size(max = 100)
    private String source;

    @Schema(description = "Honeypot field - để trống")
    private String honeypot;
}
