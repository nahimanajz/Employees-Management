import employees  from '../assets/employee';
import validators from '../helpers/Validators';
import em from '../models/employeeModel'

class Employee {
    addEmployee(req, res){      
       const  { error } = validators.employeeInfo(req.body);
       if(error) {
           return res.status(400).json({
               status:400,
               error: error.details[0].message
           });

       }
       if(em.isEmailExist(req.body.email)){
           return res.status(403).json({
               error: 403,
               message: 'Email is already exist please try another'
           });
       }
       if(em.isIdNumberExist(req.body.nid)){
        return res.status(403).json({
            error: 403,
            message: 'national id  is already exist please try another'
        });
    }
    if(em.isPhoneExist(req.body.phone)){
        return res.status(403).json({
            error: 403,
            message: 'phone is already exist please try another'
        });
    }
    if(req.body.age < 18){
        return res.status(405).json({
            status:405,
            message:'Employee whose Age is below eighteen is not allowed'
        })
    }
    
        const newEmployeeId = employees.length + 1;
        const newEmployeeInfo = {
        employeeId: newEmployeeId,
        names: req.body.names,
        email: req.body.email,
        nid: req.body.nid,
        phone: req.body.phone,
        Dob: req.body.Dob,
        status:req.body.status,
        position: req.body.position   
       } 
       employees.push(newEmployeeInfo); 
      return res.send({
           sucemss: 200,
           employee: newEmployeeInfo
       });    
    }
}
export default new Employee();