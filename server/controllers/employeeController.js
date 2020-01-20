
import validators from '../helpers/Validators';
import em from '../models/employeeModel';
import db from '../database/DbHelper';
import notify from "../helpers/sendEmail";

class Employee {    

   async addEmployee(req, res){      
       const  { error } = validators.employeeInfo(req.body);
       if(error) {
           return res.status(400).json({
               status:400,
               error: error.details[0].message
           });
       }
       try {          
       
       const isEmailExist = await db.query('SELECT * FROM employees WHERE email=$1', [req.body.email]);
       if(isEmailExist.rowCount > 0){
           return res.status(403).json({
            message: 'Email is already exist please try another'
           });
       }
       const isNidExist = await db.query('SELECT * FROM employees WHERE nid=$1', [req.body.nid]);
       if(isNidExist.rowCount > 0){
           return res.status(403).json({
            message: 'Nid is already exist please try another'
           });
       }
       const isPhoneExist = await db.query('SELECT * FROM employees WHERE phone=$1', [req.body.phone]);
       if(isPhoneExist.rowCount > 0){
           return res.status(403).json({
            message: 'phone is already exist please try another'
           });
       }
       
    // save in db employeeid 
    const text = 'INSERT INTO employees (names,position, email, status, phone, dob, nid) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const value = [req.body.names, req.body.position, req.body.email, req.body.status, req.body.phone, req.body.dob, req.body.nid]
    const user = await db.query(text, value);

    const message = 'Thank you to register on Employee Managemant System you \'re registered as Employee thank you';
        notify.sendEmailMessage(req.body, message);    
        return res.status(201).send({
            sucess: 201,
            message: 'Employee is Registered',
            employee: req.body
        });       
     
    }
        catch (error) {
          return res.status(400).send({
            sucess: 400,
            message: error,
            
        });
        }
    
          
    }
    async deleteEmployee(req, res){
        try {
          const search = await em.findOne(req.params.employeeid); 
            if(search.length < 1){
            return res.status(404).json({
                status:404,
                employee:'Employee id Not Found'
            });
          }
         const employee = await db.query('DELETE FROM employees WHERE employeeid=$1', [req.params.employeeid]); 
            return res.status(200).json({
                status:200,
                employee:'Employee of specified id is deleted permanently'
            });
         } catch(error) {
            return res.status(200).json({
                message:error
             });
         }

    }
    async editEmployee(req,res){
        const search = await em.findOne(req.params.employeeid); 
            if(search.length < 1){
            return res.status(404).json({
                status:404,
                employee:'Employee id Not Found'
            });
          }
        const  { error } = validators.employeeInfo(req.body);
       if(error) {
           return res.status(400).json({
               status:400,
               error: error.details[0].message
           });
       }
    try {
        const text = 'UPDATE employees SET names=$1, position=$2, email=$3, status=$4, phone=$5, dob=$6, nid=$7 WHERE employeeid=$8 returning*';
        const value = [req.body.names, req.body.position, req.body.email, req.body.status, req.body.phone, req.body.dob, req.body.nid, req.params.employeeid];
        const {rows} = await db.query(text, value);
        return res.status(200).json({
            status: 200,
            message: 'Employee record is modified successfully',
            employee: rows[0]

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            error:error
        });
    }
    
    
      
    }
    async activateEmployee(req, res){
       try {
        const search = await em.findOne(req.params.employeeid); 
        if(search.length < 1){
        return res.status(404).json({
            status:404,
            employee:'Employee id Not Found'
        });
        }
        
        const {rows} = await db.query('UPDATE employees SET status=$2 WHERE employeeid=$1 returning*', [req.params.employeeid, 'active']);
         return res.status(200).json({
            status: 200,
            message:`Employee ${ rows[0].names }is successfully activated`
        }); 
       } catch (error) {

        return res.status(500).json({
            status: 500,
            message:error
        }); 
       }
        

    }
    async suspendEmployee(req, res){
        const search = await em.findOne(req.params.employeeid); 
        if(search.length < 1){
        return res.status(404).json({
            status:404,
            employee:'Employee id Not Found'
        });
        }
        try {
        const { rows } = await db.query('UPDATE employees SET status=$1 WHERE employeeid=$2 returning*',['suspended', req.params.employeeid]);
        return res.status(200).json({
            status:`${rows[0].names} is successfully suspended`,

        })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status:500,
                message: error
            })
        }

    }
    async searchEmployee(req, res) {
        try {
            const {rows} = await db.query('SELECT * FROM employees WHERE position=$1 OR names=$1 OR email=$1 OR phone=$1', [req.body.keyword]); 
        if(rows.length < 1){
        return res.status(404).json({
            status:404,
            employee:'Employee id Not Found'
        });
        } else {
            return res.status(404).json({
                status:200,
                employee:rows[0]
            });
        }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status:500,
                employee:error
            });
        }
        
    }
}
export default new Employee();