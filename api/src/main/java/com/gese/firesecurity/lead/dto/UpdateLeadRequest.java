package com.gese.firesecurity.lead.dto;

import com.gese.firesecurity.lead.entity.LeadStatus;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateLeadRequest {
    private LeadStatus status;
    @Size(max = 2000)
    private String adminNote;
}
