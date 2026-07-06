package com.gese.firesecurity.news.dto;

import com.gese.firesecurity.news.entity.ArticleStatus;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UpdateArticleRequest {
    @Size(max = 500)
    private String title;
    @Size(max = 500)
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
