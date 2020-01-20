import db from "../database/DbHelper";

class employeeModel {
    async findOne(id){
        try {
       const manager = await db.query("SELECT * FROM employees WHERE employeeid=$1", [id]);    
       return manager.rows;
    } catch(error) {
       console.log(error);   
    }  
    }
}
export default new employeeModel();