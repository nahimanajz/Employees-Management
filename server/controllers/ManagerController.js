import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import managers  from '../assets/managers';
import validators from '../helpers/Validators';
import notify from "../helpers/SendEmail";
import mm from '../models/ManagerModel';
import db from "../database/Database";

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
    const token =mm.generateToken(req.body);
    bcrypt.hash(req.body.password, 8, (err, hash) => {
          

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
       if(db.executeQuery(text, values)){
           const message = `We are welcoming You  to join Employees Management`;
           notify.sendNotification(req.body, message);
           return res.send({
            success: 200,
            manager: newManagerInfo
        });  
       }
         
    });  
    
    }    
     async signin(req, res){
       const manager = db.executeQuery('SELECT * FROM managers WHERE email=$1', [req.body.email]);
        // console.log(manager[0]);
        
       return res.status(400).json({
           status:400,
           manager:manager[0].email
       });
       const { error } = validators.signinValidation(req.body);
       if(error) {
           return res.status(400).json({
              status: 400,
              error: error.details[0].message.split('"').join(''),
           });
       }
       try {
           const isUserExist = await mm.isEmailExist(req.body.email);
           if(!isUserExist){
               return res.status(401).json({
                   status:404,
                   error: 'User not found'
               });
           }
           const isPasswordValid = await bcrypt.compare(req.body.password, isUserExist.password);
            if(!isPasswordValid) {
                return res.status(401).json({
                    status:401,
                    error: 'invalid credentials'
                });
            }
            const managerToken = mm.generateToken(isUserExist);
            return res.status(200).header('x-auth',managerToken).json({
                status: 200,
                message: 'Manager is successfully logged in',
                data: {
                    managerid: isUserExist.managerid,
                    names: isUserExist.names,
                    nid: isUserExist.nid,
                    phone: isUserExist.phone,
                    dob: isUserExist.dob,
                    status: isUserExist.status,
                    position: isUserExist.position,
                    email: isUserExist.email,
                    token: managerToken
                      },
            });
       } catch(error) {
           return res.status(500).json({
               error: 500,
               message: error
           })
       }
        
    } 
}
export default new Manager();