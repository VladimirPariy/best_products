export class IRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isGetUpdate: boolean;

  constructor({
    firstName,
    lastName,
    email,
    password,
    isGetUpdate,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isGetUpdate: boolean;
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isGetUpdate = isGetUpdate;
  }
}
