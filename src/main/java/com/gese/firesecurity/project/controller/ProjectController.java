package com.gese.firesecurity.project.controller;

import com.gese.firesecurity.common.dto.ApiResponse;
import com.gese.firesecurity.project.dto.*;
import com.gese.firesecurity.project.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Projects")
@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @Operation(summary = "[Public] Danh sách dự án active")
    @GetMapping("/public")
    public ResponseEntity<?> findPublic(QueryProjectRequest query) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.findPublic(query)));
    }

    @Operation(summary = "[Public] Chi tiết dự án theo slug")
    @GetMapping("/public/{slug}")
    public ResponseEntity<?> findBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.findBySlug(slug)));
    }

    @Operation(summary = "[Admin] Tạo dự án")
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CreateProjectRequest dto) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.create(dto)));
    }

    @Operation(summary = "[Admin] Danh sách tất cả dự án")
    @GetMapping
    public ResponseEntity<?> findAll(QueryProjectRequest query) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.findAll(query)));
    }

    @Operation(summary = "[Admin] Chi tiết dự án theo ID")
    @GetMapping("/{id}")
    public ResponseEntity<?> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.findOne(id)));
    }

    @Operation(summary = "[Admin] Cập nhật dự án")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody UpdateProjectRequest dto) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.update(id, dto)));
    }

    @Operation(summary = "[Admin] Xóa dự án")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        projectService.remove(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa dự án thành công"));
    }
}
