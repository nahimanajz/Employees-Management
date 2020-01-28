import { it } from "mocha";
import chai, { request, expect } from "chai";
import  http from "chai-http";
import app from "../../../index";
import data from "../testConfig/token";
import employee from "../testConfig/employee";

chai.use(http);
const employeeTest = () => {
    it('should not get empployees if he doesn\'t provide valid token', (done) => {
    request(app)
    .post('/employee/search')
    .set('x-auth', 'fhdhjdfhmdvzkhvbdzmvbm')
    .send({keyword: 'mistico'})
    .end((error, res) => {
       expect(res.body).to.have.status(401);
       expect(res.body).to.have.property('error');
       done();
    });
  });

  it('should get employees if he provide valid token', (done) => {
    request(app)
    .post('/employee/search')
    .set( data.token )
    .send({keyword: 'yuhu@test.try'})
    .end((error, res) => {
       expect(res.body).to.have.status(200);
       expect(res.body).to.have.property('data');
       done();
    });
  });

  it('should delete employee if employee is found', (done) => {
   request(app)
   .delete('/employees/1')  
   .set(data.token)   
   .end((error, res) => {     
     expect(res.body).to.have.status(200);
     expect(res.body).to.have.property('data');
     done();
   });
  });
  it('should return 404 if employee is not found' ,(done)=>{
    request(app)
    .delete('/employees/1')
    .set(data.token)
    .end((error,res)=> {
    expect(res.body).to.have.status(404);
    expect(res.body).to.have.property('error');
    done();
    });
     });
    
   it('should return 201 if employee is created',(done)=> {
    request(app)
    .post('/employees')
    .set(data.token)
    .send(employee.allowedData)
    .end((error,res) => {      
       expect(res).to.have.status(201);
       expect(res.body).to.have.property('success');
       expect(res.body).to.have.property('data'); 
      done();      
    });
   }); 
   it('should return 400 if employee is not validated', (done) => {
     request(app)
     .post('/employees')
     .set(data.token)
     .send(employee.falseData)
     .end((error, res)=> {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();        
     });
   }); 
   it('should return 403 if email is exist', (done) =>{
    request(app)
    .post('/employees')
    .set(data.token)
    .send(employee.alreadyExistEmail)
    .end((error, res) =>{
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('message');
      done();
    });     
   }); 
   it('should return 403 if phone is exist', (done) =>{
    request(app)
    .post('/employees')
    .set(data.token)
    .send(employee.alreadyExistPhone)
    .end((error, res) =>{
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('message');
      done();
    });     
   });
   it('should return 403 if nid is exist', (done) =>{
    request(app)
    .post('/employees')
    .set(data.token)
    .send(employee.alreadyExistNid)
    .end((error, res) =>{
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('message');
      done();
    });     
   }); 

   //testing activate
   it('should return 200 if Employee is activated', (done) =>{
    request(app)
    .put('/employee/31/activate')
    .set(data.token)    
    .end((error, res) =>{
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message');
      done();
    });     
   }); 
   it('should return 404 if Employee enters invalid id to activate', (done) =>{
    request(app)
    .put('/employee/111/activate')
    .set(data.token)    
    .end((error, res) =>{
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error');
      done();
    });     
   }); 
//testing suspenc
   it('should return 404 if Employee enters invalid id to suspend', (done) =>{
    request(app)
    .put('/employee/117/suspend')
    .set(data.token)    
    .end((error, res) =>{
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error');
      done();
    });     
   }); 
   it('should return 200 if Employee is suspended successfully', (done) =>{
    request(app)
    .put('/employee/34/suspend')
    .set(data.token)    
    .end((error, res) =>{
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      done();
    });     
   });
   it('should return 500 if string id is given to the route', (done) =>{
    request(app)
    .put('/employee/xxcc/suspend')
    .set(data.token)    
    .end((error, res) =>{
      expect(res).to.have.status(500);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      done();
    });     
   });
}

export default employeeTest;

