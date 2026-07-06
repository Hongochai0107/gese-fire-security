package com.gese.firesecurity.product.service;

import com.gese.firesecurity.common.dto.PageResponse;
import com.gese.firesecurity.product.dto.CreateProductRequest;
import com.gese.firesecurity.product.dto.QueryProductRequest;
import com.gese.firesecurity.product.dto.UpdateProductRequest;
import com.gese.firesecurity.product.entity.Product;
import com.gese.firesecurity.product.entity.ProductImage;
import com.gese.firesecurity.product.entity.ProductStatus;
import com.gese.firesecurity.product.repository.ProductImageRepository;
import com.gese.firesecurity.product.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepo;
    private final ProductImageRepository imageRepo;

    @Transactional
    public Product create(CreateProductRequest dto) {
        Product product = Product.builder()
                .name(dto.getName()).slug(dto.getSlug()).sku(dto.getSku())
                .shortDescription(dto.getShortDescription()).description(dto.getDescription())
                .specifications(dto.getSpecifications()).features(dto.getFeatures()).price(dto.getPrice())
                .status(dto.getStatus() != null ? dto.getStatus() : ProductStatus.draft)
                .seoTitle(dto.getSeoTitle()).seoDescription(dto.getSeoDescription())
                .thumbnail(dto.getThumbnail())
                .build();

        if (dto.getCategoryId() != null) {
            product.setCategoryId(dto.getCategoryId());
        }
        if (dto.getSupplierId() != null) {
            product.setSupplierId(dto.getSupplierId());
        }

        Product saved = productRepo.save(product);
        saveImages(saved, dto.getImageUrls());
        return findOne(saved.getId());
    }

    public PageResponse<Product> findAll(QueryProductRequest query) {
        int page = query.getPage() != null ? query.getPage() : 1;
        int limit = query.getLimit() != null ? query.getLimit() : 10;

        Specification<Product> spec = buildSpec(query);
        var pageResult = productRepo.findAll(spec,
                PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "createdAt")));

        return PageResponse.of(pageResult.getContent(), page, limit, pageResult.getTotalElements());
    }

    public PageResponse<Product> findPublic(QueryProductRequest query) {
        query.setStatus(ProductStatus.active);
        return findAll(query);
    }

    public Product findOne(Long id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sản phẩm không tồn tại"));
    }

    public Product findBySlug(String slug) {
        return productRepo.findBySlugAndStatus(slug, ProductStatus.active)
                .orElseThrow(() -> new EntityNotFoundException("Sản phẩm không tồn tại"));
    }

    @Transactional
    public Product update(Long id, UpdateProductRequest dto) {
        Product product = findOne(id);

        if (dto.getName() != null) product.setName(dto.getName());
        if (dto.getSlug() != null) product.setSlug(dto.getSlug());
        if (dto.getSku() != null) product.setSku(dto.getSku());
        if (dto.getShortDescription() != null) product.setShortDescription(dto.getShortDescription());
        if (dto.getDescription() != null) product.setDescription(dto.getDescription());
        if (dto.getSpecifications() != null) product.setSpecifications(dto.getSpecifications());
        if (dto.getFeatures() != null) product.setFeatures(dto.getFeatures());
        if (dto.getPrice() != null) product.setPrice(dto.getPrice());
        if (dto.getStatus() != null) product.setStatus(dto.getStatus());
        if (dto.getSeoTitle() != null) product.setSeoTitle(dto.getSeoTitle());
        if (dto.getSeoDescription() != null) product.setSeoDescription(dto.getSeoDescription());
        if (dto.getThumbnail() != null) product.setThumbnail(dto.getThumbnail());
        if (dto.getCategoryId() != null) product.setCategoryId(dto.getCategoryId());
        if (dto.getSupplierId() != null) product.setSupplierId(dto.getSupplierId());

        productRepo.save(product);

        if (dto.getImageUrls() != null) {
            imageRepo.deleteAllByProductId(id);
            saveImages(product, dto.getImageUrls());
        }

        return findOne(id);
    }

    @Transactional
    public void remove(Long id) {
        findOne(id);
        productRepo.deleteById(id);
    }

    private void saveImages(Product product, List<String> imageUrls) {
        if (imageUrls == null || imageUrls.isEmpty()) return;
        List<ProductImage> images = IntStream.range(0, imageUrls.size())
                .mapToObj(i -> ProductImage.builder()
                        .url(imageUrls.get(i)).sortOrder(i).product(product).build())
                .toList();
        imageRepo.saveAll(images);
    }

    private Specification<Product> buildSpec(QueryProductRequest query) {
        return (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (query.getSearch() != null) {
                String like = "%" + query.getSearch() + "%";
                predicates.add(cb.or(
                        cb.like(root.get("name"), like),
                        cb.like(root.get("sku"), like)
                ));
            }
            if (query.getCategoryId() != null) {
                predicates.add(cb.equal(root.get("categoryId"), query.getCategoryId()));
            }
            if (query.getSupplierId() != null) {
                predicates.add(cb.equal(root.get("supplierId"), query.getSupplierId()));
            }
            if (query.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), query.getStatus()));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
