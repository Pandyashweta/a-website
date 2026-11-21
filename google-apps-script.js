/**
 * Google Apps Script for Aravé S. (Handles both Contact Form and Newsletter)
 * 
 * Spreadsheets:
 * - Contact Messages: https://docs.google.com/spreadsheets/d/1tGt-NxZh5r5y30THRJN4vb_3zeKgHgsKrrj-4MQ9RRE/edit
 * - Newsletter Subscribers: https://docs.google.com/spreadsheets/d/1WWM3cGK5SlWrgApE0fWCLXMO5hmSscMlQrtCakYq9Bc/edit
 */

function doPost(e) {
  var CONTACT_SPREADSHEET_ID = "1tGt-NxZh5r5y30THRJN4vb_3zeKgHgsKrrj-4MQ9RRE";
  var NEWSLETTER_SPREADSHEET_ID = "1WWM3cGK5SlWrgApE0fWCLXMO5hmSscMlQrtCakYq9Bc";
  var DESTINATION_EMAIL = "aravehere@gmail.com";
  
  try {
    var type = "";
    var name = "";
    var email = "";
    var message = "";
    var source = "Website";
    
    // Parse form parameters
    if (e && e.parameter) {
      type = e.parameter.type || "";
      name = e.parameter.name || "";
      email = e.parameter.email || "";
      message = e.parameter.message || "";
      source = e.parameter.source || source;
    }
    
    // Parse JSON payload if sent as application/json
    if (e && e.postData && e.postData.contents) {
      try {
        var json = JSON.parse(e.postData.contents);
        type = json.type || type;
        name = json.name || name;
        email = json.email || email;
        message = json.message || message;
        source = json.source || source;
      } catch (jsonErr) {}
    }
    
    var timestamp = new Date();

    // ========================================================
    // CASE 1: NEWSLETTER SUBSCRIPTION
    // ========================================================
    if (type === "newsletter" || name === "Newsletter Subscriber") {
      var newsletterSheet = SpreadsheetApp.openById(NEWSLETTER_SPREADSHEET_ID).getActiveSheet();
      
      // Auto-create header if empty
      if (newsletterSheet.getLastRow() === 0) {
        newsletterSheet.appendRow(["Timestamp", "Email", "Source"]);
        newsletterSheet.getRange(1, 1, 1, 3).setFontWeight("bold");
      }
      
      newsletterSheet.appendRow([timestamp, email, source || message || "Website Newsletter"]);
      
      // Optional notification to author
      try {
        MailApp.sendEmail({
          to: DESTINATION_EMAIL,
          subject: "💌 New Newsletter Subscriber: " + email,
          htmlBody: "<div style='font-family:sans-serif;padding:20px;'>" +
                    "<h2>New Newsletter Subscriber!</h2>" +
                    "<p><strong>Email:</strong> " + email + "</p>" +
                    "<p><strong>Source:</strong> " + (source || message) + "</p>" +
                    "<p><strong>Date:</strong> " + timestamp.toLocaleString() + "</p>" +
                    "</div>"
        });
      } catch (mailErr) {}
      
      return ContentService.createTextOutput(JSON.stringify({ result: "success", type: "newsletter" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ========================================================
    // CASE 2: CONTACT FORM MESSAGE
    // ========================================================
    var contactSheet = SpreadsheetApp.openById(CONTACT_SPREADSHEET_ID).getActiveSheet();
    
    if (contactSheet.getLastRow() === 0) {
      contactSheet.appendRow(["Timestamp", "Name", "Email", "Message"]);
      contactSheet.getRange(1, 1, 1, 4).setFontWeight("bold");
    }
    
    contactSheet.appendRow([timestamp, name, email, message]);
    
    // Send email notification for contact message
    var htmlBody = 
      "<div style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; max-width: 550px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.03);'>" +
        "<div style='border-bottom: 1px solid #eaeaea; padding-bottom: 16px; margin-bottom: 20px;'>" +
          "<h2 style='color: #111111; font-size: 20px; font-weight: 600; margin: 0; letter-spacing: -0.02em;'>New Contact Message</h2>" +
          "<p style='color: #666666; font-size: 13px; margin: 4px 0 0 0;'>Submitted from your website contact form</p>" +
        "</div>" +
        "<div style='margin-bottom: 20px;'>" +
          "<div style='margin-bottom: 10px;'><span style='color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; display: block;'>Name</span><strong style='color: #111111; font-size: 14px; font-weight: 500;'>" + name + "</strong></div>" +
          "<div style='margin-bottom: 10px;'><span style='color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; display: block;'>Email</span><a href='mailto:" + email + "' style='color: #0070f3; font-size: 14px; text-decoration: none; font-weight: 500;'>" + email + "</a></div>" +
          "<div style='margin-bottom: 10px;'><span style='color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; display: block;'>Date</span><span style='color: #111111; font-size: 14px;'>" + timestamp.toLocaleString() + "</span></div>" +
        "</div>" +
        "<div style='background-color: #fafafa; padding: 16px; border-radius: 8px; border: 1px solid #eaeaea; margin-bottom: 24px;'>" +
          "<span style='color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 8px;'>Message</span>" +
          "<div style='color: #333333; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-break: break-word;'>" + message + "</div>" +
        "</div>" +
        "<div style='border-top: 1px solid #eaeaea; padding-top: 14px; font-size: 11px; color: #888888; text-align: center;'>" +
          "This submission has been logged automatically in your Contact Google Sheet." +
        "</div>" +
      "</div>";

    MailApp.sendEmail({
      to: DESTINATION_EMAIL,
      subject: "📩 Web Message from " + name,
      replyTo: email,
      htmlBody: htmlBody
    });
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success", type: "contact" }))
      .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "active", message: "Aravé S. Form API is working!" }))
    .setMimeType(ContentService.MimeType.JSON);
}
