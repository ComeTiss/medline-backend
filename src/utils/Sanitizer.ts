import safe from "safe-regex";
import validator from "validator";

/*
  Full documentation: https://www.npmjs.com/package/validator
*/

function isSafe(input) {
  return safe(input);
}

export default {
  isSignUpValid(body) {
    if (!body || !body.email) {
      return false;
    }
    const {
      email, password, firstName, lastName,
    } = body;
    return isSafe(email)
      && validator.isEmail(email)
      && isSafe(password)
      && isSafe(firstName)
      && isSafe(lastName);
  },

  isLoginValid(body) {
    if (!body || !body.email) {
      return false;
    }
    const { email, password } = body;
    return isSafe(email)
      && validator.isEmail(email)
      && isSafe(password);
  },

  isValidStr(input: string) {
    return input != null && !!input.trim();
  },
};
