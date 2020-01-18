import { Pool, Client } from "pg";
import env from "dotenv";
env.config();

class DbHelper {  
    constructor(){
    this.pool = new Pool({
        host: process.env.PGHOST,
        database: process.env.PGDB,
        user: process.env.PGUSER,
        password: process.env.PGPASS,
        port: process.env.PGPORT
    });
      this.pool.on('connect', () => {
        console.log('DBConnection established...');
        }); 
        return this.pool;
}
endConnection(){
    this.pool.end();
}
}
export default new DbHelper();

