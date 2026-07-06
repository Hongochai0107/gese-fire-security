package com.gese.firesecurity.project.dto;

import com.gese.firesecurity.project.entity.ProjectStatus;
import lombok.Data;

@Data
public class QueryProjectRequest {
    private Integer page = 1;
    private Integer limit = 10;
    private String search;
    private ProjectStatus status;
}
