/**
 * Google Apps Script to handle Contact Form Submissions for skxie
 * 
 * Instructions:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1FnZTHodmIi9ia4wZoLwEbdWTchfWavb9gnTwrhOBRUc/edit
 * 2. Click "Extensions" > "Apps Script" in the top menu.
 * 3. Delete any default code in Code.gs and paste this entire script.
 * 4. Click the Save icon (floppy disk).
 * 5. Click "Deploy" > "New Deployment" (top-right).
 * 6. Click the gear icon next to "Select type" and choose "Web app".
 * 7. Set settings:
 *    - Description: "skxie website contact submissions"
 *    - Execute as: "Me (your-gmail-account)"
 *    - Who has access: "Anyone"  <-- IMPORTANT: Set this to "Anyone" so the website can submit messages.
 * 8. Click "Deploy" and authorize the script permissions.
 * 9. Copy the generated "Web app URL" (ends with /exec).
 * 10. Paste this URL into your website's `.env` file as VITE_CONTACT_FORM_URL.
 */

function doPost(e) {
  // Spreadsheet ID
  var SPREADSHEET_ID = "1FnZTHodmIi9ia4wZoLwEbdWTchfWavb9gnTwrhOBRUc";
  var DESTINATION_EMAIL = "skxielol@gmail.com";
  
  try {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Parse parameters (supports both Form POST and JSON POST formats)
    var name = "";
    var email = "";
    var message = "";
    
    if (e && e.parameter) {
      name = e.parameter.name || "";
      email = e.parameter.email || "";
      message = e.parameter.message || "";
    }
    
    if (e && e.postData && e.postData.contents) {
      try {
        var json = JSON.parse(e.postData.contents);
        name = json.name || name;
        email = json.email || email;
        message = json.message || message;
      } catch (jsonErr) {
        // Fallback if not standard JSON
      }
    }
    
    // Auto-setup headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Message"]);
    }
    
    // Append submission row to sheet
    var timestamp = new Date();
    sheet.appendRow([timestamp, name, email, message]);
    
    // Send email notification
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
          "This submission has been logged automatically in your Google Sheet." +
        "</div>" +
      "</div>";

    MailApp.sendEmail({
      to: DESTINATION_EMAIL,
      subject: "📩 Web Message from " + name,
      replyTo: email,
      htmlBody: htmlBody
    });
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
