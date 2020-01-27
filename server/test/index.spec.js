import signinTest from "./manager/signin.test";
import signupTest from './manager/signup.test';
import employeeTest from "./employee/employees.test";

describe('App test', () => {
    describe('Manager signin', signinTest);
    describe('Manager signup', signupTest);
    describe('EMmployee ', employeeTest);
    
});
