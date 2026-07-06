package com.gese.firesecurity.product.dto;

import com.gese.firesecurity.product.entity.ProductStatus;
import lombok.Data;

@Data
public class QueryProductRequest {
    private Integer page = 1;
    private Integer limit = 10;
    private String search;
    private Long categoryId;
    private Long supplierId;
    private ProductStatus status;
}
