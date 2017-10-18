export class Register {
  public user_id: any;
  public username: string;
  public password: string;
  constructor(username, password, doctors_id) {
    this.username = username;
    this.password = password;
    this.user_id = doctors_id
  }
}
