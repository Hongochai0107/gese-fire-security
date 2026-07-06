package com.gese.firesecurity.project.dto;

import com.gese.firesecurity.project.entity.ProjectStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CreateProjectRequest {

    @Schema(example = "Hệ thống PCCC nhà máy linh kiện điện tử")
    @NotBlank @Size(max = 500)
    private String title;

    @Schema(example = "he-thong-pccc-nha-may-linh-kien")
    @NotBlank @Size(max = 500)
    private String slug;

    private String client;
    private String location;
    private String description;
    private String content;
    private String thumbnail;
    private LocalDate completedAt;
    private List<String> scope;
    private ProjectStatus status;
    private String seoTitle;
    private String seoDescription;
    private List<String> imageUrls;
}
