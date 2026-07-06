package com.gese.firesecurity.lead.dto;

import com.gese.firesecurity.lead.entity.LeadStatus;
import lombok.Data;

@Data
public class QueryLeadRequest {
    private Integer page = 1;
    private Integer limit = 10;
    private LeadStatus status;
    private String search;
}
