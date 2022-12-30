export interface IJwtDecode {
  email: string;
  exp: number;
  iat: number;
  id: number;
  role: number;
}

export type JWT = IJwtDecode | null | "";
