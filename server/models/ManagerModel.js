import managers from "../assets/managers";
import Database from '../database/Database'
import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();

class ManagerModel {
     constructor(){
         this.manager = managers;
     }

    async isEmailExist(email){
    //return this.manager.find((data) => data.email === email);
    const rows  = await db.executeQuery('SELECT * FROM managers WHERE email = $1', [email]);
    //console.log(rows[0]);
    for( let i=0;i<= rows[0] ;i++){
     console.log(rows[i].email);
    }
    
    try {
        return rows[0];
    } catch(err){
        console.log(err.stack())
    }
          
    }
    isIdNumberExist(nid){
     db.findOne('SELECT * FROM managers WHERE nid = $1', [nid]);
       }
    /** 
    async isPhoneExist(phone){
    const {rows} = await db.executeQuery('SELECT * FROM managers WHERE phone= $1', [phone]);
    return rows[0];
    }
    */
   generateToken(manager){
       try {
           const managerPayload = {
               email: manager.email,
               managerid: manager.managerid,
               names:manager.names,
               nid: manager.nid,               
           }
           const token  = jwt.sign(managerPayload, process.env.TOKEN, { expiresIn:'24h', issuer:'www.jwt.io'});
           return token;
       } catch (err) {
           return err;
       }
   }
   

}

export default new ManagerModel();