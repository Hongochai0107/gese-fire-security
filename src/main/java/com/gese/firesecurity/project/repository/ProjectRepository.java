package com.gese.firesecurity.project.repository;

import com.gese.firesecurity.project.entity.Project;
import com.gese.firesecurity.project.entity.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project> {
    Optional<Project> findBySlugAndStatus(String slug, ProjectStatus status);
}
