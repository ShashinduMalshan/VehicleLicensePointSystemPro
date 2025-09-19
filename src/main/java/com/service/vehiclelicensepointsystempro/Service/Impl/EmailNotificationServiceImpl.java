package com.service.vehiclelicensepointsystempro.Service.Impl;

import com.service.vehiclelicensepointsystempro.Service.EmailNotificationService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailNotificationServiceImpl implements EmailNotificationService {

    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String fromAddress;

    @Override
    public void sendSuspensionEmail(String toEmail, String driverName, String reason) {
        String subject = "License Suspension Notice";
        String body = String.format(
            "Dear %s,\n\nYour driving license has been suspended.\nReason: %s\n\nIf you think this is a mistake contact the Traffic Dept.",
            driverName, reason
        );

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(fromAddress);
        msg.setTo(toEmail);
        msg.setSubject(subject);
        msg.setText(body);

        mailSender.send(msg);
    }

    // Optional: HTML email using MimeMessageHelper
    @Override
    public void sendSuspensionHtmlEmail(String toEmail, String driverName, String reason) throws MessagingException {
    MimeMessage mime = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mime, "utf-8");

    String html = "<!DOCTYPE html>" +
            "<html>" +
            "<head>" +
            "<style>" +
            "body { font-family: Arial, sans-serif; line-height: 1.6; }" +
            ".container { padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9; }" +
            ".header { font-size: 20px; font-weight: bold; color: #d32f2f; margin-bottom: 10px; }" +
            ".footer { font-size: 12px; color: #666; margin-top: 20px; }" +
            ".reason { color: #b71c1c; font-weight: bold; }" +
            "</style>" +
            "</head>" +
            "<body>" +
            "<div class='container'>" +
            "<div class='header'>🚨 License Suspension Notice</div>" +
            "<p>Dear " + driverName + ",</p>" +
            "<p>This is to inform you that <strong>your driving license has been suspended</strong> with immediate effect.</p>" +
            "<p><span class='reason'>Reason: " + reason + "</span></p>" +
            "<p><strong>Suspension Details:</strong></p>" +
            "<ul>" +
            "<li><b>Suspension Start Date:</b> 19th September 2025</li>" +
            "<li><b>Suspension Duration:</b> 6 months</li>" +
            "<li><b>License Number:</b> DL-1234-5678</li>" +
            "</ul>" +
            "<p>Please refrain from driving during this suspension period. Continuing to drive may result in severe penalties including fines and permanent license cancellation.</p>" +
            "<p>If you wish to appeal or need further clarification, kindly contact our office:</p>" +
            "<p><b>Vehicle License Authority</b><br>" +
            "123, Main Street, Colombo, Sri Lanka<br>" +
            "📞 Hotline: +94 11 234 5678<br>" +
            "✉ Email: support@vla.gov.lk</p>" +
            "<div class='footer'>" +
            "<p>⚠️ This is an automated message. Please do not reply directly to this email.</p>" +
            "<p>Thank you for your cooperation.<br>Vehicle License Authority, Sri Lanka</p>" +
            "</div>" +
            "</div>" +
            "</body>" +
            "</html>";

    helper.setText(html, true);
    helper.setTo(toEmail);
    helper.setSubject("🚨 License Suspension Notice - Vehicle License Authority");
    helper.setFrom(fromAddress);
    mailSender.send(mime);
}

}
