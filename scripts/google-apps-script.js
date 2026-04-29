// ═══════════════════════════════════════════════════════
//  KANSO WAY — Waitlist → Google Sheets
//  Google Apps Script (Tools → Script Editor in your Sheet)
// ═══════════════════════════════════════════════════════

const SHEET_NAME = 'Waitlist';

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

  // Create header row if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Source']);
    sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch(err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: 'Invalid JSON' })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const { name = '', email = '', timestamp = new Date().toISOString(), source = 'kansoway.com' } = data;

  // Duplicate check
  const emails = sheet.getRange(2, 3, Math.max(sheet.getLastRow() - 1, 1), 1).getValues().flat();
  if (emails.includes(email)) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'duplicate', message: 'Email already registered' })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([timestamp, name, email, source]);

  // Optional: send confirmation email
  // MailApp.sendEmail(email, 'You are on the KANSO WAY list', confirmationBody(name));

  return ContentService.createTextOutput(
    JSON.stringify({ status: 'success', message: 'Registered' })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', service: 'KANSO WAY Waitlist' })
  ).setMimeType(ContentService.MimeType.JSON);
}

function confirmationBody(name) {
  return `Hi ${name},\n\nYou are on the KANSO WAY waitlist.\nWe will reach out before launch with your early access link.\n\n— KANSO WAY`;
}
