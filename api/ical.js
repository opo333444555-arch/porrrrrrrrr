export default async function handler(req, res) {
  // Mock endpoint to simulate fetching user tasks/events and returning an iCal format.
  // In a real application, you would pass a userId token, fetch from Neon DB, and generate the ICS.
  
  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//StudyQuest//App//EN
BEGIN:VEVENT
SUMMARY:📝 Mock Task from Cloud
DTSTART;VALUE=DATE:20260701
DTEND;VALUE=DATE:20260701
END:VEVENT
END:VCALENDAR`;

  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="studyquest-cloud.ics"');
  res.status(200).send(ics);
}
