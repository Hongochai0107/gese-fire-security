package com.gese.firesecurity.project.service;

import com.gese.firesecurity.common.dto.PageResponse;
import com.gese.firesecurity.project.dto.*;
import com.gese.firesecurity.project.entity.Project;
import com.gese.firesecurity.project.entity.ProjectImage;
import com.gese.firesecurity.project.entity.ProjectStatus;
import com.gese.firesecurity.project.repository.ProjectImageRepository;
import com.gese.firesecurity.project.repository.ProjectRepository;
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
public class ProjectService {

    private final ProjectRepository projectRepo;
    private final ProjectImageRepository imageRepo;

    @Transactional
    public Project create(CreateProjectRequest dto) {
        Project project = Project.builder()
                .title(dto.getTitle()).slug(dto.getSlug())
                .client(dto.getClient()).location(dto.getLocation())
                .description(dto.getDescription()).content(dto.getContent())
                .thumbnail(dto.getThumbnail()).completedAt(dto.getCompletedAt())
                .scope(dto.getScope())
                .status(dto.getStatus() != null ? dto.getStatus() : ProjectStatus.draft)
                .seoTitle(dto.getSeoTitle()).seoDescription(dto.getSeoDescription())
                .build();

        Project saved = projectRepo.save(project);
        saveImages(saved, dto.getImageUrls());
        return findOne(saved.getId());
    }

    public PageResponse<Project> findAll(QueryProjectRequest query) {
        int page = query.getPage() != null ? query.getPage() : 1;
        int limit = query.getLimit() != null ? query.getLimit() : 10;

        Specification<Project> spec = buildSpec(query);
        var pageResult = projectRepo.findAll(spec,
                PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "createdAt")));
        return PageResponse.of(pageResult.getContent(), page, limit, pageResult.getTotalElements());
    }

    public PageResponse<Project> findPublic(QueryProjectRequest query) {
        query.setStatus(ProjectStatus.active);
        return findAll(query);
    }

    public Project findOne(Long id) {
        return projectRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Dự án không tồn tại"));
    }

    public Project findBySlug(String slug) {
        return projectRepo.findBySlugAndStatus(slug, ProjectStatus.active)
                .orElseThrow(() -> new EntityNotFoundException("Dự án không tồn tại"));
    }

    @Transactional
    public Project update(Long id, UpdateProjectRequest dto) {
        Project project = findOne(id);

        if (dto.getTitle() != null) project.setTitle(dto.getTitle());
        if (dto.getSlug() != null) project.setSlug(dto.getSlug());
        if (dto.getClient() != null) project.setClient(dto.getClient());
        if (dto.getLocation() != null) project.setLocation(dto.getLocation());
        if (dto.getDescription() != null) project.setDescription(dto.getDescription());
        if (dto.getContent() != null) project.setContent(dto.getContent());
        if (dto.getThumbnail() != null) project.setThumbnail(dto.getThumbnail());
        if (dto.getCompletedAt() != null) project.setCompletedAt(dto.getCompletedAt());
        if (dto.getScope() != null) project.setScope(dto.getScope());
        if (dto.getStatus() != null) project.setStatus(dto.getStatus());
        if (dto.getSeoTitle() != null) project.setSeoTitle(dto.getSeoTitle());
        if (dto.getSeoDescription() != null) project.setSeoDescription(dto.getSeoDescription());

        projectRepo.save(project);

        if (dto.getImageUrls() != null) {
            imageRepo.deleteAllByProjectId(id);
            saveImages(project, dto.getImageUrls());
        }

        return findOne(id);
    }

    @Transactional
    public void remove(Long id) {
        findOne(id);
        projectRepo.deleteById(id);
    }

    private void saveImages(Project project, List<String> imageUrls) {
        if (imageUrls == null || imageUrls.isEmpty()) return;
        List<ProjectImage> images = IntStream.range(0, imageUrls.size())
                .mapToObj(i -> ProjectImage.builder()
                        .url(imageUrls.get(i)).sortOrder(i).project(project).build())
                .toList();
        imageRepo.saveAll(images);
    }

    private Specification<Project> buildSpec(QueryProjectRequest query) {
        return (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (query.getSearch() != null) {
                String like = "%" + query.getSearch() + "%";
                predicates.add(cb.or(cb.like(root.get("title"), like), cb.like(root.get("client"), like)));
            }
            if (query.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), query.getStatus()));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
