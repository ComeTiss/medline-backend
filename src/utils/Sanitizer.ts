import safe from "safe-regex";
import validator from "validator";
import { SignUpData } from "../graphql/types/userTypes";

/*
  Full documentation: https://www.npmjs.com/package/validator
*/

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 30;

function isSafe(input) {
  return safe(input);
}

export default {
  isSignUpValid(body: SignUpData) {
    if (!body) {
      return false;
    }
    const {
      email,
      password,
      firstName,
      lastName,
      city,
      country,
      organizationName,
      functionTitle,
    } = body;
    return this.isValidEmail(email)
      && this.isValidPassword(password)
      && this.isValidStr(firstName)
      && this.isValidStr(lastName)
      && this.isValidStr(organizationName)
      && this.isValidStr(functionTitle)
      && this.isValidStr(city)
      && this.isValidStr(country);
  },

  isLoginValid(body) {
    if (!body) {
      return false;
    }
    const { email, password } = body;
    return this.isValidEmail(email)
      && this.isValidStr(password);
  },

  isValidStr(input: string) {
    return input != null && !!input?.trim() && isSafe(input);
  },
  isValidInt(input: number) {
    return input != null && validator?.isInt(input) && isSafe(input);
  },
  isValidEmail(email: string) {
    return this.isValidStr(email) && validator?.isEmail(email);
  },
  isValidPassword(password: string) {
    return this.isValidStr(password) && password.length >= PASSWORD_MIN_LENGTH
      && password.length <= PASSWORD_MAX_LENGTH;
  },
};
