package com.gese.firesecurity.news.controller;

import com.gese.firesecurity.common.dto.ApiResponse;
import com.gese.firesecurity.news.dto.*;
import com.gese.firesecurity.news.service.NewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "News")
@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    @Operation(summary = "[Public] Danh sách bài viết published")
    @GetMapping("/public")
    public ResponseEntity<?> findPublic(QueryArticleRequest query) {
        return ResponseEntity.ok(ApiResponse.ok(newsService.findPublic(query)));
    }

    @Operation(summary = "[Public] Chi tiết bài viết theo slug")
    @GetMapping("/public/{slug}")
    public ResponseEntity<?> findBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(newsService.findBySlug(slug)));
    }

    @Operation(summary = "[Public] Danh mục tin tức")
    @GetMapping("/categories/public")
    public ResponseEntity<?> findPublicCategories() {
        return ResponseEntity.ok(ApiResponse.ok(newsService.findCategories()));
    }

    @Operation(summary = "[Admin] Tạo bài viết")
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CreateArticleRequest dto, Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(ApiResponse.ok(newsService.create(dto, userId)));
    }

    @Operation(summary = "[Admin] Danh sách tất cả bài viết")
    @GetMapping
    public ResponseEntity<?> findAll(QueryArticleRequest query) {
        return ResponseEntity.ok(ApiResponse.ok(newsService.findAll(query)));
    }

    @Operation(summary = "[Admin] Chi tiết bài viết theo ID")
    @GetMapping("/{id}")
    public ResponseEntity<?> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(newsService.findOne(id)));
    }

    @Operation(summary = "[Admin] Cập nhật bài viết")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody UpdateArticleRequest dto) {
        return ResponseEntity.ok(ApiResponse.ok(newsService.update(id, dto)));
    }

    @Operation(summary = "[Admin] Xóa bài viết")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        newsService.remove(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa bài viết thành công"));
    }

    @Operation(summary = "[Admin] Tạo danh mục tin tức")
    @PostMapping("/categories")
    public ResponseEntity<?> createCategory(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(ApiResponse.ok(newsService.createCategory(
                (String) body.get("name"), (String) body.get("slug"),
                body.get("sortOrder") != null ? ((Number) body.get("sortOrder")).intValue() : null)));
    }

    @Operation(summary = "[Admin] Danh sách danh mục tin tức")
    @GetMapping("/categories/all")
    public ResponseEntity<?> findCategories() {
        return ResponseEntity.ok(ApiResponse.ok(newsService.findCategories()));
    }

    @Operation(summary = "[Admin] Cập nhật danh mục tin tức")
    @PutMapping("/categories/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.ok(newsService.updateCategory(id, body.get("name"), body.get("slug"))));
    }

    @Operation(summary = "[Admin] Xóa danh mục tin tức")
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<?> removeCategory(@PathVariable Long id) {
        newsService.removeCategory(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa danh mục tin tức thành công"));
    }
}
