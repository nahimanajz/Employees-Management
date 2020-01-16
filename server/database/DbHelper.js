import {  Pool } from "pg";
import env from "dotenv";
env.config();

const pool = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDB,
    user: process.env.PGUSER,
    password: process.env.PGPASS,
    port: process.env.PGPORT
});
pool.on('connect',()=>{
console.log('DBConnection established...');
});

export default pool;

