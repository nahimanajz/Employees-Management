import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import managers  from '../assets/managers';
import validators from '../helpers/Validators';
import mm from '../models/ManagerModel';
import Database from "../database/Database";

const db = new Database();

class Manager {
    signUp(req, res){      
       const  { error } = validators.managerInfo(req.body);
       if(error) {
           return res.status(400).json({
               status:400,
               error: error.details[0].message
           });
        }
     /**  if(mm.isEmailExist(req.body.email)){
           return res.status(403).json({
               error: 403,
               message: 'Email is already exist please try another'
           });
       }
       if(mm.isIdNumberExist(req.body.nid)){
        return res.status(403).json({
            error: 403,
            message: 'national id  is already exist please try another'
        });
    }
    if(mm.isPhoneExist(req.body.phone)){
        return res.status(403).json({
            error: 403,
            message: 'phone is already exist please try another'
        });
    }  */   
    const token =jwt.sign({data:req.body},process.env.PRIVATEKEY);
    bcrypt.hash(req.body.password, 8, (err, hash) => {
        console.log(hash);    

        const newManagerId = managers.length + 1;
        const position = "manager";
        const newManagerInfo = {
        employeeId: newManagerId,
        names: req.body.names,
        email: req.body.email,
        nid: req.body.nid,
        phone: req.body.phone,
        Dob: req.body.Dob,
        status:req.body.status,
        password: hash,    
        position: position,
        token: token
       } 
       managers.push(newManagerInfo); 

       //saving in database
       const text = 'INSERT INTO managers(nid, names, position, email, status, password,phone,dob) VALUES($1, $2,$3,$4, $5, $6, $7, $8) RETURNING *'
       const values = [req.body.nid, req.body.names, position,  req.body.email, req.body.status, hash, req.body.phone, req.body.dob];
       db.executeQuery(text, values);
       
 
       return res.send({
           success: 200,
           manager: newManagerInfo
       });    
    });  
    }      
}
export default new Manager();