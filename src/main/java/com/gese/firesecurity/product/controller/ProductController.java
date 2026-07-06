package com.gese.firesecurity.product.controller;

import com.gese.firesecurity.common.dto.ApiResponse;
import com.gese.firesecurity.product.dto.CreateProductRequest;
import com.gese.firesecurity.product.dto.QueryProductRequest;
import com.gese.firesecurity.product.dto.UpdateProductRequest;
import com.gese.firesecurity.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Products")
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @Operation(summary = "[Public] Danh sách sản phẩm active")
    @GetMapping("/public")
    public ResponseEntity<?> findPublic(QueryProductRequest query) {
        return ResponseEntity.ok(ApiResponse.ok(productService.findPublic(query)));
    }

    @Operation(summary = "[Public] Chi tiết sản phẩm theo slug")
    @GetMapping("/public/{slug}")
    public ResponseEntity<?> findBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(productService.findBySlug(slug)));
    }

    @Operation(summary = "[Admin] Tạo sản phẩm")
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CreateProductRequest dto) {
        return ResponseEntity.ok(ApiResponse.ok(productService.create(dto)));
    }

    @Operation(summary = "[Admin] Danh sách tất cả sản phẩm")
    @GetMapping
    public ResponseEntity<?> findAll(QueryProductRequest query) {
        return ResponseEntity.ok(ApiResponse.ok(productService.findAll(query)));
    }

    @Operation(summary = "[Admin] Chi tiết sản phẩm theo ID")
    @GetMapping("/{id}")
    public ResponseEntity<?> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(productService.findOne(id)));
    }

    @Operation(summary = "[Admin] Cập nhật sản phẩm")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody UpdateProductRequest dto) {
        return ResponseEntity.ok(ApiResponse.ok(productService.update(id, dto)));
    }

    @Operation(summary = "[Admin] Xóa sản phẩm")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        productService.remove(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa sản phẩm thành công"));
    }
}
