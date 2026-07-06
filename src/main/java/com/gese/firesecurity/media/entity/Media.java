package com.gese.firesecurity.media.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "media")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String filename;

    @Column(nullable = false)
    private String originalName;

    @Column(nullable = false)
    private String mimeType;

    private long size;

    @Column(nullable = false)
    private String url;

    private String alt;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
