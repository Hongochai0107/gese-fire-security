package com.gese.firesecurity.mail;

import com.gese.firesecurity.lead.dto.CreateLeadRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from:}")
    private String mailFrom;

    @Value("${app.mail.admin:}")
    private String mailAdmin;

    @Async
    public void sendNewLeadNotification(CreateLeadRequest lead) {
        if (mailFrom.isBlank() || mailAdmin.isBlank()) {
            log.warn("Mail not configured, skipping notification");
            return;
        }

        try {
            var message = mailSender.createMimeMessage();
            var helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(mailFrom);
            helper.setTo(mailAdmin);
            helper.setSubject("[GESE] Lead mới: " + lead.getName() + " - " + lead.getPhone());
            helper.setText(String.format("""
                <h2>Lead mới từ website GESE</h2>
                <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse">
                  <tr><td><strong>Họ tên</strong></td><td>%s</td></tr>
                  <tr><td><strong>SĐT</strong></td><td>%s</td></tr>
                  <tr><td><strong>Email</strong></td><td>%s</td></tr>
                  <tr><td><strong>Công ty</strong></td><td>%s</td></tr>
                  <tr><td><strong>Dịch vụ</strong></td><td>%s</td></tr>
                  <tr><td><strong>Nội dung</strong></td><td>%s</td></tr>
                </table>
                """,
                lead.getName(), lead.getPhone(),
                lead.getEmail() != null ? lead.getEmail() : "-",
                lead.getCompany() != null ? lead.getCompany() : "-",
                lead.getService() != null ? lead.getService() : "-",
                lead.getMessage() != null ? lead.getMessage() : "-"
            ), true);

            mailSender.send(message);
            log.info("Lead notification sent for {}", lead.getName());
        } catch (Exception e) {
            log.error("Failed to send lead notification", e);
        }
    }
}
