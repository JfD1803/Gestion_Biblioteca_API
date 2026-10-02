import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from "./config/env";
import v1Routes from "./api/v1/index";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(morgan("dev"));

app.use('/api/v1', v1Routes);
