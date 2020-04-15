
export default {
  key: process.env.SENDGRID_KEY,
  from: {
    email: "volunteer@medline.io",
    name: "Medline support",
  },
  subject: "Confirm your email",
  verification: {
    baseLink: "http://localhost:4000/verify",
  },
};
