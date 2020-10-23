export default interface ICreateCampaignDTO {
  nm_campaign_name: string;
  nm_campaign_description: string;
  path_image: string;
  user_owner_id?: string | undefined;
  store_owner_id: string | undefined;
  active: boolean;
}
