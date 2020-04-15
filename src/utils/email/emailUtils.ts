import http from "https";
import config from "./config";

type EmailDestinator = {
    email: string;
    name: string;
}

type EmailData = {
    destinator: EmailDestinator;
    token: string;
};

function buildVerificationLink(token: string) {
  return `${config.verification.baseLink}/${token}`;
}

export default {
  sendMailConfirmation(emailData: EmailData) {
    const verificationLink = buildVerificationLink(emailData.token);
    const options = {
      method: "POST",
      hostname: "api.sendgrid.com",
      port: null,
      path: "/v3/mail/send",
      headers: {
        authorization: `Bearer ${config.key}`,
        "content-type": "application/json",
      },
    };

    const req = http.request(options, (res) => {
      const chunks = [];
      res.on("data", (chunk) => {
        chunks.push(chunk);
      });
      res.on("end", () => {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.write(JSON.stringify({
      personalizations: [
        {
          to: [emailData.destinator],
          subject: config.subject,
        },
      ],
      from: config.from,
      content: [
        {
          type: "text/plain",
          value: `Click on this link to verify your email: ${verificationLink}`,
        },
      ],
    }));
    req.end();
  },
};
