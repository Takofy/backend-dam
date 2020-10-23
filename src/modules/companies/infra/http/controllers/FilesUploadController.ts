import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FileUploadService from '@modules/companies/services/FileUploadService';

export default class FilesUploadController {
  public async update(request: Request, response: Response): Promise<Response> {
    const fileUploadService = container.resolve(FileUploadService);
    // const data = request.body.fileInfo;
    // const data2 = JSON.parse(data);
    const file = await fileUploadService.execute({
      fileName: request.file.filename,
    });
    return response.json(file);
  }
}
