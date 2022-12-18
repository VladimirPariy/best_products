import jwt from "jsonwebtoken";

export const generateJwtToken = (id: string, email: string, role: number): string => {
  return jwt.sign({id, email, role}, process.env.SECRET || '', {expiresIn: '24h'})
}