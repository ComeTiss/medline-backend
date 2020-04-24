
const URL_DEV = "http://localhost:4000";
const URL_PROD = "https://medline-backend.herokuapp.com";
const BASE_URL = process.env.NODE_ENV === "production" ? URL_PROD : URL_DEV;

export default {
  key: process.env.SENDGRID_KEY,
  admin: {
    name: "Medline administrator",
    email: "support@medline.io",
  },
  from: {
    email: "volunteer@medline.io",
    name: "Medline support",
  },
  subject: "Confirm your email",
  verification: {
    userBaseLink: `${BASE_URL}/verify`,
    orgBaseLink: `${BASE_URL}/verify-org`,
  },
};
