package com.gese.firesecurity.media.controller;

import com.gese.firesecurity.common.dto.ApiResponse;
import com.gese.firesecurity.media.service.MediaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Media")
@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
public class MediaController {

    private final MediaService mediaService;

    @Operation(summary = "Upload một ảnh")
    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) throws Exception {
        return ResponseEntity.ok(ApiResponse.ok(mediaService.upload(file)));
    }

    @Operation(summary = "Upload nhiều ảnh")
    @PostMapping("/upload-multiple")
    public ResponseEntity<?> uploadMultiple(@RequestParam("files") MultipartFile[] files) throws Exception {
        return ResponseEntity.ok(ApiResponse.ok(mediaService.uploadMultiple(files)));
    }

    @Operation(summary = "Danh sách media")
    @GetMapping
    public ResponseEntity<?> findAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int limit) {
        return ResponseEntity.ok(ApiResponse.ok(mediaService.findAll(page, limit)));
    }

    @Operation(summary = "Xóa media")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        mediaService.remove(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa file thành công"));
    }
}
