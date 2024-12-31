export interface IRegistorUser {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirm: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}
