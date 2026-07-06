package com.gese.firesecurity.category.service;

import com.gese.firesecurity.category.dto.CreateCategoryRequest;
import com.gese.firesecurity.category.dto.UpdateCategoryRequest;
import com.gese.firesecurity.product.entity.Category;
import com.gese.firesecurity.product.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepo;

    @Transactional
    public Category create(CreateCategoryRequest dto) {
        Category category = Category.builder()
                .name(dto.getName()).slug(dto.getSlug())
                .description(dto.getDescription()).image(dto.getImage())
                .sortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : 0)
                .build();
        if (dto.getParentId() != null) {
            category.setParentId(dto.getParentId());
        }
        return categoryRepo.save(category);
    }

    public List<Category> findAllTree() {
        return categoryRepo.findByParentIdIsNullOrderBySortOrderAscNameAsc();
    }

    public List<Category> findAllFlat() {
        return categoryRepo.findAllByOrderBySortOrderAsc();
    }

    public Category findOne(Long id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Danh mục không tồn tại"));
    }

    @Transactional
    public Category update(Long id, UpdateCategoryRequest dto) {
        Category cat = findOne(id);
        if (dto.getName() != null) cat.setName(dto.getName());
        if (dto.getSlug() != null) cat.setSlug(dto.getSlug());
        if (dto.getDescription() != null) cat.setDescription(dto.getDescription());
        if (dto.getImage() != null) cat.setImage(dto.getImage());
        if (dto.getSortOrder() != null) cat.setSortOrder(dto.getSortOrder());
        if (dto.getParentId() != null) cat.setParentId(dto.getParentId());
        if (dto.getIsActive() != null) cat.setActive(dto.getIsActive());
        return categoryRepo.save(cat);
    }

    @Transactional
    public void remove(Long id) {
        findOne(id);
        categoryRepo.deleteById(id);
    }
}
