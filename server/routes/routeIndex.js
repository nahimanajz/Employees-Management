import express from "express";
import employee from '../controllers/employeeController';
import manager from '../controllers/ManagerController';
import db from '../database/Database'
import auth from "../middlewares/Authentication";


const routes = express.Router();
routes.post('/employees', employee.addEmployee);
routes.post('/manager/signup', manager.signUp);
routes.post('/manager/signin', manager.signin);
routes.get('/managers/all', db.getAll);

routes.get('/manager/', auth.managerAuthorizer, (req,res) => {
res.status(200).json({
    message:'It works'
});
});
routes.post('/manager/:id', auth.managerAuthorizer, db.findOne)
//  routes.delete('/employees/:employee_id/', employee.signIn);
// routes.put('/employees/employee_id', )
// routes.put('/employees/{employee id}/activate',);
// routes.put(': /employees/{employee id}/suspend')
// routes.post('/employee/search/{key}',) //position, name, email or phone number


export default routes;