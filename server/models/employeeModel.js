import employees from "../assets/employee";

class employeeModel {
     constructor(){
         this.employee = employees;
     }
    isEmailExist(email){
    return this.employee.find((data) => data.email === email);
         
    }
    isIdNumberExist(nid){
    return this.employee.find((data) => data.nid === nid);
    }
    isPhoneExist(phone){
     return this.employee.find((data) => data.phone === phone)
    }
    
    
}

export default new employeeModel();