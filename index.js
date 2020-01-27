import express from 'express';
import bodyParser from 'body-parser';
import routes from './server/routes/routeIndex';
import env from "dotenv";

env.config();
const app = express();

const port = process.env.PORT || 9000;
app.use(express.json());
app.use(bodyParser.json({limit: '500mb'}))

app.use('/', routes);

app.listen(port, () => console.log(`App is started ${port}`));

export default app;
