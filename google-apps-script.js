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
    MailApp.sendEmail({
      to: DESTINATION_EMAIL,
      subject: "📩 New Website Message from: " + name,
      replyTo: email,
      body: "Hello skxie,\n\nYou have received a new message from the contact form on your website.\n\n" +
            "--------------------------------------------------\n" +
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Date: " + timestamp.toString() + "\n" +
            "--------------------------------------------------\n\n" +
            "Message:\n" + message + "\n\n" +
            "--------------------------------------------------\n" +
            "Note: This entry has also been logged in your Google Sheet."
    });
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
