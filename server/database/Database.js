import { Pool } from "pg";
import env from "dotenv";
env.config();

const  pool = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDB,    
    user: process.env.PGUSER,
    password:process.env.PGPASS,
    port: process.env.PGPORT    
});
pool.on('connect',() => {
    console.log('Database connected..');
})

class Database {
    
      async executeQuery(query,values){
        const res = await pool.query(query,values,(err, resp) => {
           console.log(err, resp);  
            
        });
    }  
    async getAll(req,res){
        const table = 'managers';
        const { rows } = await pool.query(`SELECT * FROM ${table}`);
             //return console.log(rows[0]);
           try {
            return res.status(200).json({
                status:200,
                managers: rows
          });
           } catch (error) {
               console.log(error)
           } 
            
    } 
    async findOne(req, res){
        try {
       const manager = await pool.query("SELECT * FROM managers WHERE managerid=$1", [req.params.id]);
       if(manager.rowCount === 0){
           return res.status(404).json({ 
               status:404,
               message:'NOT FOUND'
             });
       } else {
           
           return res.status(404).json({
            status:200,
             message: manager.rows
            });
            
       }
    } catch(error) {
       res.send({error});   
    }
    }
    

}
export default  new Database();

