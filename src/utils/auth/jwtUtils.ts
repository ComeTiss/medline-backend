import jwt from "jsonwebtoken";

import User from "../../db/models/User";
import { JWT_TOKEN, BEARER } from "./config";

export async function decodeJwt(token: string) {
  try {
    return jwt.verify(token, JWT_TOKEN);
  } catch (error) {
    return null;
  }
}

export async function validateJwtMiddleware(req, res, next) {
  try {
    let token: string = req.header("authorization");
    token = token.replace(BEARER, "");
    if (await decodeJwt(token) == null) {
      res.status(401).send({
        error: "Unauthorized request",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Internal error occured",
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
