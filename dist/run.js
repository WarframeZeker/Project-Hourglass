/* Execute when installed */
function main() {
  onOpen();
};

function include(filename) {
  Logger.log(filename)
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
};

/* What should the add-on do when a document is opened */
function onOpen() {
  SpreadsheetApp.getUi()
  .createAddonMenu() // Add a new option in the Google Docs Add-ons Menu
  .addItem("Scheduler", "showSidebar")
  .addToUi();  // Run the showSidebar function when someone clicks the menu
};

/* Show a 300px sidebar with the HTML from googlemaps.html */
function showSidebar() {
  var html = HtmlService.createTemplateFromFile("scheduler")
    .evaluate()
    .setTitle("RA Scheduler - Let's Plan");
  SpreadsheetApp.getUi().showSidebar(html);
};

function getSheets() {
  SpreadsheetApp
  .getActive()
  .getSheets();
};

function getActiveSheetName() {
  SpreadsheetApp
  .getActive()
  .getSheetName();
};

function getSheetsData() {
  const activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    const sheetName = sheet.getName();
    return {
      text: sheetName,
      sheetIndex: index,
      isActive: sheetName === activeSheetName,
    };
  });
};

function addSheet(sheetTitle) {
  SpreadsheetApp
    .getActive()
    .insertSheet(sheetTitle);
  return getSheetsData();
};

function deleteSheet(sheetIndex) {
  const sheets = getSheets();
  SpreadsheetApp
    .getActive()
    .deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};


function setActiveSheet(sheetName) {
  SpreadsheetApp
    .getActive()
    .getSheetByName(sheetName)
    .activate();
  return getSheetsData();
};

/**
 * Lists 10 upcoming events in the user's calendar.
 */
function listUpcomingEvents() {
  var calendarId = 'primary';
  var optionalArgs = {
    timeMin: (new Date()).toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 50,
    orderBy: 'startTime'
  };
  var response = Calendar.Events.list(calendarId, optionalArgs);
  var events = response.items;
  var listOfEvents = [];

  if (events.length > 0) {
    for (i = 0; i < events.length; i++) {
      var event = events[i];
      var when = event.start.dateTime;
      var end = event.end.dateTime;
      if (!when) {
        when = event.start.date;
      }
      listOfEvents.push(event);
    }
    Logger.log('list of events: ' + listOfEvents);
    return listOfEvents;
  } else {
    Logger.log('No upcoming events found.');
    return null;
  }
};

/** Function finds the spreadsheet id of the active sheet that is running the add-on  */
function retrieveSpreadSheet() {
  // The code below opens a spreadsheet using its ID and logs the name for it.
  // Note that the spreadsheet is NOT physically opened on the client side.
  // It is opened on the server only (for modification by the script).
  
  // var file = DriveApp.getFileById('1MUZHTC_7tuAYawnEFjOpW9KibJFQSIUooGtJOIeYVrs');
  var fileId = SpreadsheetApp.getActiveSpreadsheet().getId(); // fix this... currently returns null val
  Logger.log(fileId);
  return fileId;
};