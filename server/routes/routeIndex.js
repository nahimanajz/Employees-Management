import express from "express";
import employee from '../controllers/employeeController';
import manager from '../controllers/ManagerController';
import db from '../database/Database'
import auth from "../middlewares/Authentication";

const routes = express.Router();
routes.post('/manager/signup', manager.signUp);
routes.post('/manager/signin', manager.userLogin);
routes.get('/managers/all', db.getAll);

routes.get('/manager/', auth.managerAuthorizer, (req,res) => {
res.status(200).json({
    message:'It works'
});
});
// routes.post('/manager/:id', auth.managerAuthorizer, db.findOne)

routes.post('/employees', auth.managerAuthorizer, employee.addEmployee);
routes.delete('/employees/:employeeid', auth.managerAuthorizer, employee.deleteEmployee);
routes.put('/employee/:employeeid', auth.managerAuthorizer, employee.editEmployee);
routes.put('/employee/:employeeid/activate', auth.managerAuthorizer, employee.activateEmployee);
routes.put('/employee/:employeeid/suspend', auth.managerAuthorizer, employee.suspendEmployee);
 routes.post('/employee/search', auth.managerAuthorizer, employee.searchEmployee);


export default routes;