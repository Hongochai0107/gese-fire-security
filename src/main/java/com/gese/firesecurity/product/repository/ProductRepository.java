package com.gese.firesecurity.product.repository;

import com.gese.firesecurity.product.entity.Product;
import com.gese.firesecurity.product.entity.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    Optional<Product> findBySlugAndStatus(String slug, ProductStatus status);
}
