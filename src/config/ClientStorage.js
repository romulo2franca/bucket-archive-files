/* eslint-disable no-await-in-loop */
const { Storage } = require('@google-cloud/storage');
const logger = require('./logger');

class ClientStorage {
  constructor(config) {
    this.client = new Storage(config.client);
    this.bucket = config.bucket;
    this.daysToRetain = Number(config.daysToRetain);
    this.date = new Date();
    this.date = this.date.setDate(this.date.getDate() - this.daysToRetain);
    this.archiveBucket = config.archiveBucket;
    this.filesArchived = 0;
  }

  async listFiles() {
    return this.client
      .bucket(this.bucket)
      .getFiles(this.options)
      .catch(err => logger.error(err));
  }

  async asyncForEach(array, callback) {
    this.array = array;
    this.callback = callback;
    for (this.index = 0; this.index < array.length; this.index += 1) {
      await this.callback(this.array[this.index], this.index, this.array);
    }
  }

  async moveFiles(files) {
    await this.asyncForEach(files, async file => {
      if (new Date(file.metadata.timeCreated) < this.date) {
        await this.client
          .bucket(this.bucket)
          .file(file.name)
          .move(this.client.bucket(this.archiveBucket).file(file.name));
        this.filesArchived += 1;
        logger.info(`File Archived: ${file.name}`);
      }
    });
  }

  info(prefix) {
    logger.info('================ Archive Info ==================');
    logger.info(`Source Bucket: gs://${this.bucket}/${prefix}`);
    logger.info(`Days to Retain: ${this.daysToRetain}`);
    logger.info(`Archive Bucket: gs://${this.archiveBucket}/${prefix}`);
    logger.info(`Files Archived: ${this.filesArchived}`);
  }

  async archiveFiles(prefix) {
    this.options = { prefix };
    [this.files] = await this.listFiles();
    await this.moveFiles(this.files);
    this.info(prefix);
  }
}

module.exports = { ClientStorage };
