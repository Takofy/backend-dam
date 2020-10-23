export default interface ICreateUserDTO {
  username: string;
  email: string;
  password: string;
  nm_fullname: string;
  nr_document: number;
  nm_sex: string;
  dt_born: Date;
  path_avatar: string;
  active: boolean;
}
