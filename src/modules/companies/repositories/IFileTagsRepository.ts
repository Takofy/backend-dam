import FileTags from '../infra/typeorm/entities/FileTags';
import ICreateFileTagDTO from '../dtos/ICreateFileTagDTO';

export default interface IFileTagsRepository {
  findByFileTag(tag_id: string, file_id: string): Promise<FileTags | undefined>;
  create(data: ICreateFileTagDTO): Promise<FileTags>;
  save(fileTag: FileTags): Promise<FileTags>;
}
