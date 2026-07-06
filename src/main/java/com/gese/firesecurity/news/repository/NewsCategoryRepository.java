package com.gese.firesecurity.news.repository;

import com.gese.firesecurity.news.entity.NewsCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsCategoryRepository extends JpaRepository<NewsCategory, Long> {
    List<NewsCategory> findAllByOrderBySortOrderAsc();
}
