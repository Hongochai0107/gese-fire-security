package com.gese.firesecurity.product.repository;

import com.gese.firesecurity.product.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByParentIdIsNullOrderBySortOrderAscNameAsc();
    List<Category> findAllByOrderBySortOrderAsc();
}
