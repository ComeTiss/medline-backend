import jwt from "jsonwebtoken";

import User from "../../db/models/User";
import { BEARER } from "./config";
import UserDao from "../../dao/UserDao";

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
    if (req.method === "GET" && process.env.NODE_ENV !== "production") {
      next();
      return;
    }
    // Verify request has a token
    let token: string = req.header("authorization");
    if (!token) {
      res.status(403).send({
        error: "Forbidden request",
      });
      return;
    }
    // Verify token is valid
    token = token.replace(BEARER, "");
    const user = await decodeJwt(token);
    if (user == null) {
      res.status(401).send({
        error: "Unauthorized request",
      });
      return;
    }
    // Verify decoded user is valid
    // @ts-ignore
    const existingUser = await UserDao.findOneById(user?.id);
    if (!existingUser || !existingUser.verifiedAt) {
      res.status(401).send({
        error: "Invalid user - must be a verified user.",
      });
      return;
    }
    req.user = user;
    next();
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
