package com.gese.firesecurity.news.service;

import com.gese.firesecurity.common.dto.PageResponse;
import com.gese.firesecurity.news.dto.*;
import com.gese.firesecurity.news.entity.*;
import com.gese.firesecurity.news.repository.ArticleRepository;
import com.gese.firesecurity.news.repository.NewsCategoryRepository;
import com.gese.firesecurity.news.repository.TagRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final ArticleRepository articleRepo;
    private final NewsCategoryRepository newsCatRepo;
    private final TagRepository tagRepo;

    @Transactional
    public Article create(CreateArticleRequest dto, Long authorId) {
        Article article = Article.builder()
                .title(dto.getTitle()).slug(dto.getSlug())
                .thumbnail(dto.getThumbnail()).content(dto.getContent())
                .excerpt(dto.getExcerpt())
                .status(dto.getStatus() != null ? dto.getStatus() : ArticleStatus.draft)
                .seoTitle(dto.getSeoTitle()).seoDescription(dto.getSeoDescription())
                .authorId(authorId)
                .build();

        if (dto.getCategoryId() != null) article.setCategoryId(dto.getCategoryId());
        if (dto.getStatus() == ArticleStatus.published) {
            article.setPublishedAt(dto.getPublishedAt() != null ? dto.getPublishedAt() : LocalDateTime.now());
        }
        if (dto.getTags() != null && !dto.getTags().isEmpty()) {
            article.setTags(findOrCreateTags(dto.getTags()));
        }

        return articleRepo.save(article);
    }

    public PageResponse<Article> findAll(QueryArticleRequest query) {
        int page = query.getPage() != null ? query.getPage() : 1;
        int limit = query.getLimit() != null ? query.getLimit() : 10;

        Specification<Article> spec = buildSpec(query);
        var pageResult = articleRepo.findAll(spec,
                PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "createdAt")));
        return PageResponse.of(pageResult.getContent(), page, limit, pageResult.getTotalElements());
    }

    public PageResponse<Article> findPublic(QueryArticleRequest query) {
        query.setStatus(ArticleStatus.published);
        return findAll(query);
    }

    public Article findOne(Long id) {
        return articleRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bài viết không tồn tại"));
    }

    public Article findBySlug(String slug) {
        return articleRepo.findBySlugAndStatus(slug, ArticleStatus.published)
                .orElseThrow(() -> new EntityNotFoundException("Bài viết không tồn tại"));
    }

    @Transactional
    public Article update(Long id, UpdateArticleRequest dto) {
        Article article = findOne(id);

        if (dto.getTitle() != null) article.setTitle(dto.getTitle());
        if (dto.getSlug() != null) article.setSlug(dto.getSlug());
        if (dto.getThumbnail() != null) article.setThumbnail(dto.getThumbnail());
        if (dto.getContent() != null) article.setContent(dto.getContent());
        if (dto.getExcerpt() != null) article.setExcerpt(dto.getExcerpt());
        if (dto.getStatus() != null) {
            article.setStatus(dto.getStatus());
            if (dto.getStatus() == ArticleStatus.published && article.getPublishedAt() == null) {
                article.setPublishedAt(LocalDateTime.now());
            }
        }
        if (dto.getSeoTitle() != null) article.setSeoTitle(dto.getSeoTitle());
        if (dto.getSeoDescription() != null) article.setSeoDescription(dto.getSeoDescription());
        if (dto.getCategoryId() != null) article.setCategoryId(dto.getCategoryId());

        if (dto.getTags() != null) {
            article.setTags(dto.getTags().isEmpty() ? new ArrayList<>() : findOrCreateTags(dto.getTags()));
        }

        return articleRepo.save(article);
    }

    @Transactional
    public void remove(Long id) {
        findOne(id);
        articleRepo.deleteById(id);
    }

    // News Categories
    public NewsCategory createCategory(String name, String slug, Integer sortOrder) {
        return newsCatRepo.save(NewsCategory.builder()
                .name(name).slug(slug).sortOrder(sortOrder != null ? sortOrder : 0).build());
    }

    public List<NewsCategory> findCategories() {
        return newsCatRepo.findAllByOrderBySortOrderAsc();
    }

    @Transactional
    public NewsCategory updateCategory(Long id, String name, String slug) {
        NewsCategory cat = newsCatRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Danh mục tin tức không tồn tại"));
        if (name != null) cat.setName(name);
        if (slug != null) cat.setSlug(slug);
        return newsCatRepo.save(cat);
    }

    public void removeCategory(Long id) {
        newsCatRepo.deleteById(id);
    }

    private List<Tag> findOrCreateTags(List<String> names) {
        List<Tag> tags = new ArrayList<>();
        for (String name : names) {
            String slug = name.toLowerCase().replaceAll("[^a-z0-9\\p{L}]+", "-").replaceAll("^-|-$", "");
            Tag tag = tagRepo.findBySlug(slug).orElseGet(() ->
                    tagRepo.save(Tag.builder().name(name).slug(slug).build()));
            tags.add(tag);
        }
        return tags;
    }

    private Specification<Article> buildSpec(QueryArticleRequest query) {
        return (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (query.getSearch() != null) {
                String like = "%" + query.getSearch() + "%";
                predicates.add(cb.or(cb.like(root.get("title"), like), cb.like(root.get("excerpt"), like)));
            }
            if (query.getCategoryId() != null) {
                predicates.add(cb.equal(root.get("categoryId"), query.getCategoryId()));
            }
            if (query.getTag() != null) {
                Join<Article, Tag> tagJoin = root.join("tags");
                predicates.add(cb.equal(tagJoin.get("slug"), query.getTag()));
            }
            if (query.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), query.getStatus()));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
