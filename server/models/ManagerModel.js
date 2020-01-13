import managers from "../assets/managers";
import Database from '../database/Database'
const db = new Database();
class ManagerModel {
     constructor(){
         this.manager = managers;
     }

    async isEmailExist(email){
    //return this.manager.find((data) => data.email === email);
    const rows  = await db.executeQuery('SELECT * FROM managers WHERE email = $1', [email]);
    console.log(rows[0]);
    try {
        return rows[0]
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
}

export default new ManagerModel();