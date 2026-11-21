/**
 * Google Apps Script for Aravé S. Newsletter Subscribers
 * 
 * Target Google Sheet:
 * https://docs.google.com/spreadsheets/d/1WWM3cGK5SlWrgApE0fWCLXMO5hmSscMlQrtCakYq9Bc/edit
 * 
 * INSTRUCTIONS TO DEPLOY:
 * 1. Open your Newsletter Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1WWM3cGK5SlWrgApE0fWCLXMO5hmSscMlQrtCakYq9Bc/edit
 * 2. Click "Extensions" > "Apps Script" in the top menu.
 * 3. Delete any existing code in the editor, and paste this entire code.
 * 4. Click the Save icon (floppy disk).
 * 5. Click "Deploy" > "New deployment" (top-right blue button).
 * 6. Click the gear icon next to "Select type" and choose "Web app".
 * 7. Set the fields:
 *    - Description: "Aravé S. Newsletter"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"  <-- CRITICAL: Must be "Anyone" so visitors can subscribe!
 * 8. Click "Deploy" and click "Authorize access" (choose your Google account).
 * 9. Copy the generated "Web app URL" (ends with /exec).
 * 10. Give the URL to me or paste it in your .env file as VITE_NEWSLETTER_FORM_URL!
 */

function doPost(e) {
  var SPREADSHEET_ID = "1WWM3cGK5SlWrgApE0fWCLXMO5hmSscMlQrtCakYq9Bc";
  var NOTIFICATION_EMAIL = "aravehere@gmail.com";
  
  try {
    var sheet;
    try {
      sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    } catch(sheetErr) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    }
    
    var email = "";
    var source = "Website Newsletter";
    
    // Parse form parameters
    if (e && e.parameter) {
      email = e.parameter.email || "";
      source = e.parameter.source || e.parameter.message || "Website Newsletter";
    }
    
    // Parse JSON payload if sent as JSON
    if (e && e.postData && e.postData.contents) {
      try {
        var json = JSON.parse(e.postData.contents);
        email = json.email || email;
        source = json.source || json.message || source;
      } catch (jsonErr) {}
    }
    
    if (!email) {
      return ContentService.createTextOutput(JSON.stringify({ result: "error", message: "Email required" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Email", "Source"]);
      sheet.getRange(1, 1, 1, 3).setFontWeight("bold");
    }
    
    // Append subscriber row
    var timestamp = new Date();
    sheet.appendRow([timestamp, email, source]);
    
    // Optional email notification to author
    try {
      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: "💌 New Newsletter Subscriber: " + email,
        htmlBody: "<div style='font-family:sans-serif;padding:20px;'>" +
                  "<h2>New Newsletter Subscriber!</h2>" +
                  "<p><strong>Email:</strong> " + email + "</p>" +
                  "<p><strong>Source:</strong> " + source + "</p>" +
                  "<p><strong>Timestamp:</strong> " + timestamp.toString() + "</p>" +
                  "</div>"
      });
    } catch(mailErr) {}
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "alive", service: "Aravé S. Newsletter" }))
    .setMimeType(ContentService.MimeType.JSON);
}
