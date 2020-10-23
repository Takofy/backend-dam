export default interface ICreateStoreDTO {
  nm_corporate_name: string;
  nm_fantasy_name: string;
  nm_initials: string;
  nr_cnpj: number;
  nr_inscricao_estadual: number;
  nr_ccm: number;
  dt_born: Date;
  id_company_owner: string;
  type_company: string;
  active: boolean;
}
