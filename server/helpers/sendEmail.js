import emailer from "nodemailer";

class SendEmail{
 sendNotification(receiver, message) {
     this.sendEmail(receiver, message);
         
 }
 async sendEmailMessage(receiver, message) {
     try{
         this.sender = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure:false,
          auth: {
              user:process.env.MAILERUSER,
              pass:process.env.MAILERPASS,
          },   
         });
         
         this.mailOptions = {
             from: `The Employee Management System ${process.env.MAILERUSER}`,
             to: receiver.email,
             subject: 'Employee Management ltd says',
             text: `hello ${receiver.username} ${message}`
         };
         return await this.sender.sendMail(this.mailOptions);

     } catch(err){
         return err;
     }
 }
}