import express from "express";
import employee from '../controllers/employeeController';
import manager from '../controllers/ManagerController';
import db from '../database/Database'
import auth from "../middlewares/Authentication";
import multer from "multer";
import path from 'path';

// const upload = multer({ dest: '../uploads'}); 
const storage = multer.diskStorage({
    destination:'../uploads',
    filename: (req, file, cb) => {
        cb(null,file.filename, '-', Date.now() + path.extname(file.originalname)).single('myList');
    }
});
const upload = multer({ storage: storage});

const routes = express.Router();
routes.post('/manager/signup', manager.signUp);
routes.post('/manager/signin', manager.userLogin);
routes.get('/managers/all', db.getAll);

routes.get('/manager/', auth.managerAuthorizer, (req,res) => {
res.status(200).json({
    message:'It works'
});
});
routes.post('/employees', auth.managerAuthorizer, employee.addEmployee);
routes.delete('/employees/:employeeid', auth.managerAuthorizer, employee.deleteEmployee);
routes.put('/employee/:employeeid', auth.managerAuthorizer, employee.editEmployee);
routes.put('/employee/:employeeid/activate', auth.managerAuthorizer, employee.activateEmployee);
routes.put('/employee/:employeeid/suspend', auth.managerAuthorizer, employee.suspendEmployee);
routes.post('/employee/search', auth.managerAuthorizer, employee.searchEmployee);
routes.post('/employees/upload',auth.managerAuthorizer, (req, res, next) => {
    
    try {
        if(req.file){
            const identifier = Math.random().toString(36).slice(2);
            const data = {
                url: identifier,
                name: req.file.originalname,
                encoding: req.file.encoding,
                mimetype: req.file.mimetype,
                size: req.file.size
            }
            const file = {
                name: data.name,
                size: data.size,
                path_on_disk: req.file.path,
                identifier: identifier
            }
            File.create(file).then((rFile) => {
                return res.status(200).send(data);
            });
        } else {
            res.status(404).send('file not found')
        }
    
    } catch (error) {
        console.log(error);
    }
    
 });
routes.post('/trav/Upload', function(req, res,next){
    upload(req, res, function(error){
        console.log(req.file)
    if(error){
        return res.send({ error: error });
    } else {
        console.log(req.file);
        res.send({message: 'working fine'});
    }
 });
    
});


export default routes;