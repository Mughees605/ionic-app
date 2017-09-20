export class PatientModel {
  public firstname:string;
  public lastname:string;
  public patientdis:string;
  public patientmed:string;
  public cost:string;
  public Date:string;
  constructor(firstname,lastname,patientdis,patientmed,cost,Date) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.patientdis = patientdis;
    this.patientmed = patientmed;
    this.cost = cost;
    this.Date = Date;
  }
}
