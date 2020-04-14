import jwt from "jsonwebtoken";

import User from "../db/models/User";
import { JWT_TOKEN } from "./config";

export async function decodeJwt(token: string): Promise<User> {
  return jwt.verify(token, JWT_TOKEN);
}

export async function validateJwtMiddleware(req, res, next) {
  try {
    const token = req.cookies.access_token;
    await decodeJwt(token);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({
      error: err,
    });
  }
}

export async function forgeJwt(user: User) {
  let token;
  try {
    token = await jwt.sign(JSON.stringify(user), JWT_TOKEN);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
  return token;
}
