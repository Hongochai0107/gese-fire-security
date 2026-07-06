package com.gese.firesecurity.category.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateCategoryRequest {

    @Schema(example = "Đầu báo cháy")
    @NotBlank @Size(max = 255)
    private String name;

    @Schema(example = "dau-bao-chay")
    @NotBlank @Size(max = 255)
    private String slug;

    private String description;
    private String image;
    private Integer sortOrder;
    private Long parentId;
}
