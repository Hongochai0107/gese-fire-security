package com.gese.firesecurity.media.repository;

import com.gese.firesecurity.media.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<Media, Long> {
}
