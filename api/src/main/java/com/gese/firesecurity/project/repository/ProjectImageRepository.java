package com.gese.firesecurity.project.repository;

import com.gese.firesecurity.project.entity.ProjectImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectImageRepository extends JpaRepository<ProjectImage, Long> {
    void deleteAllByProjectId(Long projectId);
}
