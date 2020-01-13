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
           // console.log(err, resp);  
            
        });
    }
    async findOne(query, param) {
        const {result} = await pool.query(query, param ,(err, res) => {
       try {
         if(result[0]){
             console.log("RELATIVE INFORMATION IS FOUND IN OUR DATABASE");
         }
       } catch(err) {
           console.log(err.stack);
       }
        });

        
    }
}
export default  Database;

