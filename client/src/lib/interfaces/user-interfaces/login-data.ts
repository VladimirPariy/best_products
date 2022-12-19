export class ILoginData {
  login: string;
  password: string;

  constructor({ login, password }: { login: string; password: string }) {
    this.login = login;
    this.password = password;
  }
}
