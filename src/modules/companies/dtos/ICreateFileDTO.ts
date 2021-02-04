export default interface ICreateFileDTO {
  nm_title: string;
  nm_description: string;
  nm_original_file_name: string;
  nm_type: string;
  nm_subtype: string;
  nm_mime: string;
  nm_s3_version: string;
  nm_s3_name: string;
  nm_url: string;
  nr_code: number;
  nr_width: number;
  nr_height: number;
  nr_size: string;
  dt_publication: Date;
  dt_expiration: Date;
  campaign_owner_id: string;
  user_owner_id: string;
  store_owner_id: string;
  active: boolean;
  path_thumbnail: string;
  nm_status: string;
}
