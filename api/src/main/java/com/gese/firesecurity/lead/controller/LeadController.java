package com.gese.firesecurity.lead.controller;

import com.gese.firesecurity.common.dto.ApiResponse;
import com.gese.firesecurity.lead.dto.*;
import com.gese.firesecurity.lead.service.LeadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Leads")
@RestController
@RequestMapping("/leads")
@RequiredArgsConstructor
public class LeadController {

    private final LeadService leadService;

    @Operation(summary = "[Public] Gửi form liên hệ")
    @PostMapping("/submit")
    public ResponseEntity<?> submit(@Valid @RequestBody CreateLeadRequest dto, HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null) ip = request.getRemoteAddr();
        leadService.create(dto, ip);
        return ResponseEntity.ok(ApiResponse.ok("Gửi yêu cầu thành công. Chúng tôi sẽ liên hệ sớm nhất!"));
    }

    @Operation(summary = "[Admin] Danh sách leads")
    @GetMapping
    public ResponseEntity<?> findAll(QueryLeadRequest query) {
        return ResponseEntity.ok(ApiResponse.ok(leadService.findAll(query)));
    }

    @Operation(summary = "[Admin] Export CSV leads")
    @GetMapping("/export")
    public ResponseEntity<byte[]> exportCsv(QueryLeadRequest query) {
        String csv = leadService.exportCsv(query);
        byte[] content = ("﻿" + csv).getBytes(java.nio.charset.StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=leads.csv")
                .contentType(MediaType.parseMediaType("text/csv; charset=utf-8"))
                .body(content);
    }

    @Operation(summary = "[Admin] Chi tiết lead")
    @GetMapping("/{id}")
    public ResponseEntity<?> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(leadService.findOne(id)));
    }

    @Operation(summary = "[Admin] Cập nhật trạng thái lead")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody UpdateLeadRequest dto) {
        return ResponseEntity.ok(ApiResponse.ok(leadService.update(id, dto)));
    }

    @Operation(summary = "[Admin] Xóa lead")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        leadService.remove(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa lead thành công"));
    }
}
