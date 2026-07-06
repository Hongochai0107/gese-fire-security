package com.gese.firesecurity.supplier.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateSupplierRequest {

    @Size(max = 255)
    private String name;

    @Size(max = 255)
    private String slug;

    private String logo;
}
