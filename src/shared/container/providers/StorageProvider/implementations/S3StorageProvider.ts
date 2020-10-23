import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<void> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    // const fileContent = await fs.promises.readFile(originalPath, {
    //   encoding: 'utf-8',
    // });
    const fileContent = await fs.promises.readFile(originalPath);

    const eTag = await this.client
      .putObject({
        Bucket: 'bsn-dam',
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
      })
      .promise();

    // Check if file has been uploaded to s3 then delete file on tmp folder
    if (eTag) {
      await fs.promises.unlink(originalPath);
    }
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: 'bsn-dam',
        Key: file,
      })
      .promise();
  }
}

export default DiskStorageProvider;
