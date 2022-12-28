declare namespace Express {
  interface Request {
    user: jwt.JwtPayload;
  }
}
