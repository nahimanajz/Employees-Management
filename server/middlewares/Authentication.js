import jwt  from "jsonwebtoken";
import env from "dotenv";
env.config();

class Authentication {
    managerAuthorizer(req,res, next){
        const checkedToken = req.header('x-auth');
        if(!checkedToken){
            return res.status(403).json({
              status :403,
              error: 'Access Forbidden'
            });
        } else {
            try {
                 const decoded = jwt.verify(checkedToken, process.env.TOKEN, { expiresIn:'365d', issuer:'www.jwt.io' });
                 req.decoded = decoded;
                 return next();
            } catch (error) {
                return res.status(401).json({
                 status: 401,
                 error: 'Invalid Token'
                });
            }
        }
    }
}
export default new Authentication();