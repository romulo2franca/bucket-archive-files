const client = require('./ClientStorage');

const storage = new client.ClientStorage({
  client: {
    projectId: process.env.PROJECT_ID || 'certain-horizon-183311',
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  },
  bucket: process.env.SOURCE_BUCKET_NAME || 'bi-comexport-com-br-erp-files',
  daysToRetain: process.env.DAYS_TO_RETAIN || '20',
  archiveBucket: process.env.ARCHIVE_BUCKET_NAME || 'archive-comex'
});

module.exports = storage;
