const client = require("./ClientStorage");

const storage = new client.ClientStorage({
  client: {
    projectId: process.env.BUCKET_PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  },
  bucket: process.env.BUCKET_SOURCE_NAME,
  archiveBucket: process.env.BUCKET_ARCHIVE_NAME,
  daysToRetain: process.env.DAYS_TO_RETAIN
});

module.exports = storage;
