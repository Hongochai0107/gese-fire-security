package com.gese.firesecurity.supplier.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateSupplierRequest {

    @Schema(example = "Hochiki")
    @NotBlank @Size(max = 255)
    private String name;

    @Schema(example = "hochiki")
    @NotBlank @Size(max = 255)
    private String slug;

    private String logo;
}
