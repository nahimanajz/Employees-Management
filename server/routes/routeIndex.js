import express from "express";
import employee from '../controllers/employeeController';
import manager from '../controllers/ManagerController';

const routes = express.Router();
routes.post('/employees', employee.addEmployee);
routes.post('/manager/signup', manager.signUp)
//  routes.delete('/employees/:employee_id/', employee.signIn);
// routes.put('/employees/employee_id', )
// routes.put('/employees/{employee id}/activate',);
// routes.put(': /employees/{employee id}/suspend')
// routes.post('/employee/search/{key}',) //position, name, email or phone number


export default routes;