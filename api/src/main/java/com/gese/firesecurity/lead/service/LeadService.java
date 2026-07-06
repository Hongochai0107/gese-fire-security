package com.gese.firesecurity.lead.service;

import com.gese.firesecurity.common.dto.PageResponse;
import com.gese.firesecurity.lead.dto.*;
import com.gese.firesecurity.lead.entity.Lead;
import com.gese.firesecurity.lead.repository.LeadRepository;
import com.gese.firesecurity.mail.MailService;
import com.opencsv.CSVWriter;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeadService {

    private final LeadRepository leadRepo;
    private final MailService mailService;

    @Transactional
    public void create(CreateLeadRequest dto, String ipAddress) {
        if (dto.getHoneypot() != null && !dto.getHoneypot().isBlank()) {
            throw new IllegalArgumentException("Spam detected");
        }

        Lead lead = Lead.builder()
                .name(dto.getName()).phone(dto.getPhone())
                .email(dto.getEmail()).company(dto.getCompany())
                .message(dto.getMessage()).service(dto.getService())
                .source(dto.getSource()).ipAddress(ipAddress)
                .build();
        leadRepo.save(lead);

        mailService.sendNewLeadNotification(dto);
    }

    public PageResponse<Lead> findAll(QueryLeadRequest query) {
        int page = query.getPage() != null ? query.getPage() : 1;
        int limit = query.getLimit() != null ? query.getLimit() : 10;

        Specification<Lead> spec = buildSpec(query);
        var pageResult = leadRepo.findAll(spec,
                PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "createdAt")));
        return PageResponse.of(pageResult.getContent(), page, limit, pageResult.getTotalElements());
    }

    public Lead findOne(Long id) {
        return leadRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Lead không tồn tại"));
    }

    @Transactional
    public Lead update(Long id, UpdateLeadRequest dto) {
        Lead lead = findOne(id);
        if (dto.getStatus() != null) lead.setStatus(dto.getStatus());
        if (dto.getAdminNote() != null) lead.setAdminNote(dto.getAdminNote());
        return leadRepo.save(lead);
    }

    @Transactional
    public void remove(Long id) {
        findOne(id);
        leadRepo.deleteById(id);
    }

    public String exportCsv(QueryLeadRequest query) {
        query.setLimit(10000);
        var result = findAll(query);

        StringWriter sw = new StringWriter();
        try (CSVWriter writer = new CSVWriter(sw)) {
            writer.writeNext(new String[]{"ID", "Họ tên", "SĐT", "Email", "Công ty", "Dịch vụ", "Nội dung", "Trạng thái", "Ghi chú", "Ngày tạo"});
            for (Lead lead : result.getData()) {
                writer.writeNext(new String[]{
                        String.valueOf(lead.getId()), lead.getName(), lead.getPhone(),
                        lead.getEmail(), lead.getCompany(), lead.getService(),
                        lead.getMessage(), lead.getStatus().name(), lead.getAdminNote(),
                        lead.getCreatedAt() != null ? lead.getCreatedAt().toString() : ""
                });
            }
        } catch (Exception e) {
            throw new RuntimeException("Export CSV failed", e);
        }
        return sw.toString();
    }

    private Specification<Lead> buildSpec(QueryLeadRequest query) {
        return (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (query.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), query.getStatus()));
            }
            if (query.getSearch() != null) {
                String like = "%" + query.getSearch() + "%";
                predicates.add(cb.or(
                        cb.like(root.get("name"), like),
                        cb.like(root.get("phone"), like),
                        cb.like(root.get("email"), like)
                ));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
