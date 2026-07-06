package com.gese.firesecurity.product.dto;

import com.gese.firesecurity.product.entity.ProductStatus;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
public class UpdateProductRequest {

    @Size(max = 255)
    private String name;

    @Size(max = 255)
    private String slug;

    @Size(max = 50)
    private String sku;

    private String shortDescription;
    private String description;
    private Map<String, String> specifications;
    private List<String> features;
    private BigDecimal price;
    private ProductStatus status;
    private String seoTitle;
    private String seoDescription;
    private String thumbnail;
    private Long categoryId;
    private Long supplierId;
    private List<String> imageUrls;
}
