package com.gese.firesecurity.media.service;

import com.gese.firesecurity.common.dto.PageResponse;
import com.gese.firesecurity.media.entity.Media;
import com.gese.firesecurity.media.repository.MediaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MediaService {

    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml");

    private final MediaRepository mediaRepo;

    @Value("${app.upload.dir}")
    private String uploadDir;

    public Media upload(MultipartFile file) throws IOException {
        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new IllegalArgumentException("Chỉ chấp nhận file ảnh (JPEG, PNG, WebP, GIF, SVG)");
        }

        Path dir = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(dir);

        String ext = "";
        String originalName = file.getOriginalFilename();
        if (originalName != null && originalName.contains(".")) {
            ext = originalName.substring(originalName.lastIndexOf("."));
        }
        String filename = UUID.randomUUID() + ext;

        Files.copy(file.getInputStream(), dir.resolve(filename));

        Media media = Media.builder()
                .filename(filename)
                .originalName(originalName != null ? originalName : filename)
                .mimeType(file.getContentType())
                .size(file.getSize())
                .url("/uploads/" + filename)
                .build();

        return mediaRepo.save(media);
    }

    public List<Media> uploadMultiple(MultipartFile[] files) throws IOException {
        List<Media> results = new ArrayList<>();
        for (MultipartFile file : files) {
            results.add(upload(file));
        }
        return results;
    }

    public PageResponse<Media> findAll(int page, int limit) {
        var pageResult = mediaRepo.findAll(
                PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "createdAt")));
        return PageResponse.of(pageResult.getContent(), page, limit, pageResult.getTotalElements());
    }

    public void remove(Long id) {
        mediaRepo.deleteById(id);
    }
}
