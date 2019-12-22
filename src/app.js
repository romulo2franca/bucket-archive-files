const storage = require('./config/storage');
const prefixes = require('./config/prefixEnum');
const logger = require('./config/logger');

async function main() {
  Object.values(prefixes).forEach(async prefix => {
    await storage.archiveFiles(prefix);
  });
}

main()
  .then(logger.info('Done'))
  .catch(err => {
    logger.error(err);
    process.exit(1);
  });
