package com.gese.firesecurity.category.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateCategoryRequest {
    @Size(max = 255)
    private String name;
    @Size(max = 255)
    private String slug;
    private String description;
    private String image;
    private Integer sortOrder;
    private Long parentId;
    private Boolean isActive;
}
