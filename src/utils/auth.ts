import jwt from "jsonwebtoken";

import User from "../db/models/User";
import config from "./config";


export async function decodeJwt(token: string): Promise<User> {
  return jwt.verify(token, config.JWT_TOKEN);
}

export async function validateJwt(userId: number, token: string): Promise<User> {
  try {
    if (!token || !userId) throw new Error("error: Token validation failed");
    const decodedToken = await decodeJwt(token);
    const { id } = decodedToken;
    if (userId !== id) throw new Error("error: Invalid user ID");
    return decodedToken;
  } catch (err) {
    throw new Error(err);
  }
}

export async function validateJwtMiddleware(req, res, next) {
  try {
    // TODO (lzi): implement token in cookie or headers
    // const token = req.headers["x-access-token"];
    const { body } = req;
    if (!body) throw new Error("error: request must have a body");
    const { id, token } = body;
    validateJwt(id, token);
    next();
  } catch (err) {
    res.status(401).send({
      error: err,
    });
  }
}

export async function forgeJwt(user: User) {
  let token;
  try {
    token = await jwt.sign(JSON.stringify(user), config.JWT_TOKEN);
  } catch (err) {
    throw new Error(err);
  }
  return token;
}
