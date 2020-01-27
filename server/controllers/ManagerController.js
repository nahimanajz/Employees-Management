import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import managers  from '../assets/managers';
import validators from '../helpers/Validators';
import notify from "../helpers/SendEmail";
import mm from '../models/ManagerModel';
import dHelper from "../database/dbHelper";


class Manager {  
                
    async signUp(req, res){      
       const  { error } = validators.managerInfo(req.body);
       if(error) {
           return res.status(400).json({
               status:400,
               error: error.details[0].message
           });
        }
       
    
    const token =mm.generateToken(req.body);
    const hash = await bcrypt.hash(req.body.password, 8);  
  
  try {
    const isEmailExist = await dHelper.query('SELECT * FROM managers WHERE email=$1', [req.body.email]);
    if(isEmailExist.rowCount > 0){
        return res.status(403).json({
         message: 'Email is already exist please try another'
        });
    }
    const isNidExist = await dHelper.query('SELECT * FROM managers WHERE nid=$1', [req.body.nid]);
    if(isNidExist.rowCount > 0){
        return res.status(403).json({
         message: 'Nid is already exist please try another'
        });
    }
    const isPhoneExist = await dHelper.query('SELECT * FROM managers WHERE phone=$1', [req.body.phone]);
    if(isPhoneExist.rowCount > 0){
        return res.status(403).json({
         message: 'phone is already exist please try another'
        });
    }
       //saving in database
       const text = 'INSERT INTO managers(nid, names, position, email, status, password,phone,dob) VALUES($1, $2,$3,$4, $5, $6, $7, $8) RETURNING*'
       const values = [req.body.nid, req.body.names, 'Manager',  req.body.email, req.body.status, hash, req.body.phone, req.body.dob];
        
       if(await dHelper.query(text, values)){
           const message = `We are welcoming You  to join Employees Management as Manager`;
           notify.sendNotification(req.body, message);
           
           return res.send({
               success: 201,
               data: {
                   name: req.body.names,
                   email: req.body.email,
                   position: req.body.position,
                   status: req.body.status,
                   dob:    req.body.dob,
                   nid: req.body.nid
               }                      
        });  
       }      
  } catch (error) {
    console.log(error)
    return res.status(500).json({        
        status:500,
        error: error
    });
  }     
    }    
     
    async userLogin(req, res){
        try {
            const {rows} = await dHelper.query('SELECT * FROM managers WHERE email=$1', [req.body.email]);
         if(rows.length === 0){
            return res.status(401).json({
                status:401,
                error: 'Invalid Credentials'
            });  
         } else {
          const passCheck = await bcrypt.compare(req.body.password, req.body.password);
          if(!passCheck) {
            return res.status(401).json({
                status:401,
                error: 'Invalid Credentials'
            });
        } 
         const user = {
             email: req.body.email,
             managerid: req.body.managerid,
             names:req.body.names,
             nid: req.body.nid
         }
         const token = mm.generateToken(user);
            return res.send({
                success: 200,
                manager: req.body,
                token:token
            });  
         }            
        } catch (error) {
             console.log(error);
        }
        
    }
}
export default new Manager();