import http from "https";
import Organization from "db/models/Organization";
import config from "./config";

type EmailDestinator = {
    email: string;
    name: string;
}

type EmailData = {
    destinator: EmailDestinator;
    token: string;
};

function buildEmailHtmlContent(body) {
  const html = "<!DOCTYPE html>"
  + "<html>"
  + "<head>"
      + "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />"
      + "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />"
      + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />"
      + "<title></title>"
  + "</head>"
  + "<body>"
  + `${body}`
  + "</body>"
  + "</html>";
  return html;
}

function sendMailConfirmation(destinator: EmailDestinator, content) {
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
        to: [destinator],
        subject: config.subject,
      },
    ],
    from: config.from,
    content: [
      content,
    ],
  }));
  req.end();
}


export default {
  sendUserMailConfirmation(emailData: EmailData) {
    const verificationLink = `${config.verification.userBaseLink}/${emailData.token}`;
    const emailBody = `<p>To validate your email, click <a href="${verificationLink}">HERE</a></p>`;
    const emailContentValue = buildEmailHtmlContent(emailBody);
    const content = {
      type: "text/html",
      value: emailContentValue,
    };
    sendMailConfirmation(emailData.destinator, content);
  },

  sendOrganizationMailConfirmation(token: string, organisation: Organization) {
    const verificationLink = `${config.verification.orgBaseLink}/${token}`;
    const emailBody = "<p> User created a new organisation: </p>"
    + `<p>Name: ${organisation.name}</p>`
    + `<p>Country: ${organisation.country}</p>`
    + `<p>City: ${organisation.city}</p><br/>`
    + `<p>To validate, click <a href="${verificationLink}">HERE</a></p>`;
    const emailContentValue = buildEmailHtmlContent(emailBody);
    const content = {
      type: "text/html",
      value: emailContentValue,
    };
    sendMailConfirmation(config.admin, content);
  },
};
