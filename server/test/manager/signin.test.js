import app from "../../../index";
import { it } from "mocha";
import chai, { request, expect } from "chai";
import  http from "chai-http";

chai.use(http);

const signinTest = () => {
    it('should not authorize if user is unauthenticated',(done)=>{
    request(app)
    .post('/manager/signin')
    .send({email: 'jazonahimana@gmail.com', password: 'mistico'})
    .end((error, res) => {
       expect(res.body).to.have.status(401);
       expect(res.body).to.have.property('error');
       done();
    });
    });
};
export default signinTest;


