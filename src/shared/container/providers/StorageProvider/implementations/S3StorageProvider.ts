import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import { blobToBase64String } from 'blob-util';
import { generateAsync } from 'jszip';
import { zip } from 'zip-a-folder';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async downloadFile(files: string): Promise<void> {
    // const originalPath = path.resolve(uploadConfig.tmpFolder, file);
    const originalPath = path.resolve(`${uploadConfig.tmpFolder}/arquivo.png`);

    // Baixa ativo do S3 e salva no servidor
    await Promise.all(
      files.map(async fileName => {
        const file = await this.client
          .getObject({
            Bucket: 'bsn-dam',
            Key: fileName,
          })
          .promise();

        const eTag = file.ETag.replace(/"/g, '');

        const originalFilePath = path.resolve(
          `${uploadConfig.tmpFolder}/ativos/${fileName}`,
        );
        const fileBody = file.Body;
        fs.writeFileSync(originalFilePath, fileBody);
      }),
    );
    const originalFolderPath = path.resolve(`${uploadConfig.tmpFolder}`);

    // Zipa ativos
    await zip(
      `${originalFolderPath}/ativos`,
      `${originalFolderPath}/zip/download-ativos.zip`,
    );

    // Exclui ativo(s) do servidor após de serem zipados
    await Promise.all(
      files.map(async fileName => {
        await fs.promises.unlink(`${originalFolderPath}\\ativos/${fileName}`);
      }),
    );

    const fileFinalPath = `${originalFolderPath}/zip/download-ativos.zip`;

    return fileFinalPath;
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
