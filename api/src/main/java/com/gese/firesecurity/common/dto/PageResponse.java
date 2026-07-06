package com.gese.firesecurity.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse<T> {
    private List<T> data;
    private Meta meta;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Meta {
        private int page;
        private int limit;
        private long total;
        private int totalPages;
    }

    public static <T> PageResponse<T> of(List<T> data, int page, int limit, long total) {
        return PageResponse.<T>builder()
                .data(data)
                .meta(Meta.builder()
                        .page(page).limit(limit).total(total)
                        .totalPages((int) Math.ceil((double) total / limit))
                        .build())
                .build();
    }
}
