import joi from "joi";
class Validation {
    employeeInfo(data){
        const employeeSchema = {
            employeeId: joi.optional(),
            email: joi.string().email().required(),
            nid: joi.string().min(16).max(16).required(),
            phone: joi.number().required(),
            names: joi.string().required(),
            position: joi.string().required(),
            status: joi.optional(),
            dob: joi.number().max(2002), 
                     
           
        }
        return joi.validate(data, employeeSchema);
    }
    managerInfo(data){
        const managerSchema = {
            employeeId: joi.optional(),
            email: joi.string().email().required(),
            nid: joi.string().min(16).max(16).required(),
            phone: joi.number().required(),
            names: joi.string().required(),
            position: joi.string().optional(),
            status: joi.optional(),
            dob: joi.number().max(2002),             
            password:joi.string().required()           
           
        }
        return joi.validate(data, managerSchema);
    }
    signinValidation(data){
        const schema = {
            email: joi.string().email().required(),
            password: joi.required()
        }
        return joi.validate(data, schema);
    }
}
export default new Validation();