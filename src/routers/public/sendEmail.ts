import { Application, NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
require("dotenv").config();

export = (app: Application) => {
  app.post(
    "/enviar-email",
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email } = req.body;
  
      const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "contaparaoaplicativo46@gmail.com",
          pass: "qligjxixyympkfui",
        },
      });
  
      const mailOptions = {
        from: 'webb-general@hotmail.com',
        to: email,
        subject: 'Friend Request',
        html: `
          <p>Thank you for wanting to play Dota with me!</p>
          <p>Here is my Steam profile: <a href="${process.env.steamProfileLink}">${process.env.steamProfileLink}</a></p>
        `,
      };
  
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.toString());
        }
        res.status(200).send("E-mail enviado: " + info.response);
      });
    }
  );
};