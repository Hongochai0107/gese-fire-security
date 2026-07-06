package com.gese.firesecurity.news.repository;

import com.gese.firesecurity.news.entity.Article;
import com.gese.firesecurity.news.entity.ArticleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long>, JpaSpecificationExecutor<Article> {
    Optional<Article> findBySlugAndStatus(String slug, ArticleStatus status);
}
