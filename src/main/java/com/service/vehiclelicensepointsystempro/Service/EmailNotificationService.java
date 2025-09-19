package com.service.vehiclelicensepointsystempro.Service;

import jakarta.mail.MessagingException;

public interface EmailNotificationService {
    void sendSuspensionEmail(String toEmail, String driverName, String reason);

    // Optional: HTML email using MimeMessageHelper
    void sendSuspensionHtmlEmail(String toEmail, String driverName, String reason) throws MessagingException;
}
