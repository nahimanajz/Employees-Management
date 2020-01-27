import nodemailer from "nodemailer";
import env from "dotenv";
env.config();

class SendEmail{
 sendNotification(receiver, message) {
     this.sendEmailMessage(receiver, message);         
 }
 async sendEmailMessage(receiver, message) {
     try{
         const testAccount = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
              user: process.env.MAILERUSER,
              pass: process.env.MAILERPASS,
          },   
         });
         
         let info = {
             from: `The Employee Management System ${process.env.MAILERUSER}`,
             to: receiver.email,
             subject: 'Employee Management ltd says',
             text: `Dear ${receiver.names} ${message} `,
             
             
         };
         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
         return await  testAccount.sendMail(info);

     } catch(err){
         return console.log(err);
     }
 }
}

export default new SendEmail();