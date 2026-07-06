package com.gese.firesecurity.news.dto;

import com.gese.firesecurity.news.entity.ArticleStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CreateArticleRequest {

    @Schema(example = "Hướng dẫn lắp đặt hệ thống báo cháy")
    @NotBlank @Size(max = 500)
    private String title;

    @Schema(example = "huong-dan-lap-dat-he-thong-bao-chay")
    @NotBlank @Size(max = 500)
    private String slug;

    private String thumbnail;
    private String content;
    private String excerpt;
    private ArticleStatus status;
    private LocalDateTime publishedAt;
    private String seoTitle;
    private String seoDescription;
    private Long categoryId;
    private List<String> tags;
}
