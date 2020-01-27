import { it } from "mocha";
import chai, { expect, request } from "chai"
import http from "chai-http";
import data from "../testConfig/token";
import manager from "../testConfig/manager";
import app from "../../../index";

chai.use(http);

const signUp = () => {
 it('should return 200 if user is authenticated', (done)=> {
     request(app)
     .post('/manager/signup')
     .set(data.token)
     .send(manager.allowedData)
     .end((error, res) => {
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
      done();
     }); 
 });
 it('should return 403 if email is exist', (done) =>{
    request(app)
    .post('/manager/signup')    
    .send(manager.emailExist)
    .end((error, res) =>{
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('message');
      done();
    });     
   }); 
   it('should return 403 if phone is exist', (done) =>{
    request(app)
    .post('/manager/signup')    
    .send(manager.phoneExist)
    .end((error, res) =>{
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('message');
      done();
    });     
   });
   it('should return 403 if nid is exist', (done) =>{
    request(app)
    .post('/manager/signup')    
    .send(manager.nidExist)
    .end((error, res) =>{
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('message');
      done();
    });     
   }); 
}
export default signUp;