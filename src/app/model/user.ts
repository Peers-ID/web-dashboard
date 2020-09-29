export class User {
  id: number;
  koperasi_id: string;
  fullname: string;
  phone_mobile: string;
  birthdate: string;
  email: string;
  role: string;
  ak_id: string;
  updatedAt: string;
  createdAt: string;
  status: string;

  constructor(data: any) {
    this.id = data.id;
    this.koperasi_id = data.koperasi_id;
    this.fullname = data.fullname;
    this.phone_mobile = data.phone_mobile;
    this.birthdate = data.birthdate;
    this.email = data.email;
    this.role = data.role;
    this.ak_id = data.ak_id;
    this.updatedAt = data.UpdatedAt;
    this.createdAt = data.CreatedAt;
    this.status = data.Status;
  }
}
