package com.gese.firesecurity.supplier.controller;

import com.gese.firesecurity.common.dto.ApiResponse;
import com.gese.firesecurity.supplier.dto.CreateSupplierRequest;
import com.gese.firesecurity.supplier.dto.UpdateSupplierRequest;
import com.gese.firesecurity.supplier.service.SupplierService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Suppliers")
@RestController
@RequestMapping("/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    @Operation(summary = "[Public] Danh sách nhà cung cấp")
    @GetMapping("/public")
    public ResponseEntity<?> findPublic() {
        return ResponseEntity.ok(ApiResponse.ok(supplierService.findAll()));
    }

    @Operation(summary = "[Admin] Danh sách nhà cung cấp")
    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(ApiResponse.ok(supplierService.findAll()));
    }

    @Operation(summary = "[Admin] Chi tiết nhà cung cấp")
    @GetMapping("/{id}")
    public ResponseEntity<?> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(supplierService.findOne(id)));
    }

    @Operation(summary = "[Admin] Tạo nhà cung cấp")
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CreateSupplierRequest dto) {
        return ResponseEntity.ok(ApiResponse.ok(supplierService.create(dto)));
    }

    @Operation(summary = "[Admin] Cập nhật nhà cung cấp")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody UpdateSupplierRequest dto) {
        return ResponseEntity.ok(ApiResponse.ok(supplierService.update(id, dto)));
    }

    @Operation(summary = "[Admin] Xóa nhà cung cấp")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        supplierService.remove(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa nhà cung cấp thành công"));
    }
}
