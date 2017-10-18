export class Login {
  public user_id: any;
  public password: string;
  constructor(doctors_id,password) {
    this.password = password;
    this.user_id = doctors_id
  }
}
