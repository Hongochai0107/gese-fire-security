package com.gese.firesecurity.news.dto;

import com.gese.firesecurity.news.entity.ArticleStatus;
import lombok.Data;

@Data
public class QueryArticleRequest {
    private Integer page = 1;
    private Integer limit = 10;
    private String search;
    private Long categoryId;
    private String tag;
    private ArticleStatus status;
}
