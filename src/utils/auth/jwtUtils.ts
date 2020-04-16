import jwt from "jsonwebtoken";

import User from "../../db/models/User";
import { BEARER } from "./config";

const { JWT_PRIVATE_KEY } = process.env;

export async function decodeJwt(token: string) {
  try {
    return jwt.verify(token, JWT_PRIVATE_KEY);
  } catch (error) {
    return null;
  }
}

export async function validateJwtMiddleware(req, res, next) {
  try {
    let token: string = req.header("authorization");
    if (!token) {
      res.status(403).send({
        error: "Forbidden request",
      });
      return;
    }
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
    token = await jwt.sign(JSON.stringify(user), JWT_PRIVATE_KEY);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
  return token;
}
