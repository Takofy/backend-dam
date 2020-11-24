import Tag from '../infra/typeorm/entities/Tag';
import ICreateTagDTO from '../dtos/ICreateTagDTO';

export default interface ITagsRepository {
  findByTag(nm_tag: string, store_id: string): Promise<Tag | undefined>;
  create(data: ICreateTagDTO): Promise<Tag>;
  save(tag: Tag): Promise<Tag>;
}
