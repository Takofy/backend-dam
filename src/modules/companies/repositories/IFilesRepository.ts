import File from '../infra/typeorm/entities/File';
import ICreateFileDTO from '../dtos/ICreateFileDTO';

export default interface IFilesRepository {
  findByNameAndCampaign(
    nm_s3_version: string,
    campaign_owner_id: string,
  ): Promise<File | undefined>;
  create(data: ICreateFileDTO): Promise<File>;
  save(file: File): Promise<File>;
}
