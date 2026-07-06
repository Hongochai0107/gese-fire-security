package com.gese.firesecurity.category.controller;

import com.gese.firesecurity.category.dto.CreateCategoryRequest;
import com.gese.firesecurity.category.dto.UpdateCategoryRequest;
import com.gese.firesecurity.category.service.CategoryService;
import com.gese.firesecurity.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Categories")
@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(summary = "[Public] Cây danh mục (active)")
    @GetMapping("/public")
    public ResponseEntity<?> findPublic() {
        return ResponseEntity.ok(ApiResponse.ok(categoryService.findAllTree()));
    }

    @Operation(summary = "[Admin] Tạo danh mục")
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CreateCategoryRequest dto) {
        return ResponseEntity.ok(ApiResponse.ok(categoryService.create(dto)));
    }

    @Operation(summary = "[Admin] Danh sách tất cả danh mục")
    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(ApiResponse.ok(categoryService.findAllFlat()));
    }

    @Operation(summary = "[Admin] Chi tiết danh mục")
    @GetMapping("/{id}")
    public ResponseEntity<?> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(categoryService.findOne(id)));
    }

    @Operation(summary = "[Admin] Cập nhật danh mục")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody UpdateCategoryRequest dto) {
        return ResponseEntity.ok(ApiResponse.ok(categoryService.update(id, dto)));
    }

    @Operation(summary = "[Admin] Xóa danh mục")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        categoryService.remove(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa danh mục thành công"));
    }
}
