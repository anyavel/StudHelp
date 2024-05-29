// const express = require('express');
import express from 'express';
const app = express();
// const fileUpload = require('express-fileupload');
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
// const mongoose = require('mongoose');
// const { PORT, dbConnection } = require('./config/config');
import config from './config/config.js';
// const path = require('path');
import path from 'path';
import cors from  'cors'

// const authRouter = require('./routes/authRoutes');
import { authRouter } from'./routes/authRoutes.js';
// const announcementsRouter = require('./routes/announcementsRoutes');
import { announcementsRouter } from './routes/announcementsRoutes.js';
// const adminRouter = require('./routes/adminRoutes');
import {adminRouter} from './routes/adminRoutes.js';
//body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/files', express.static(path.join(process.cwd(), 'static')))
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
}))

app.use(cors());
//register routes
app.use("/auth", authRouter);
app.use("/announcements", announcementsRouter);
app.use("/admin", adminRouter);

//error middleware (handles next() with argument)
app.use((err, req, res, next) => {
    console.log(err);
    const status = err?.status || 500;
    return res?.status(status).json({
        message: err?.message,
        status,
    });
});



app.listen(config.PORT, async () => {
    //db connect
    await mongoose.connect(config.dbConnection);
    console.log(`Server has started on port ${config.PORT}`);
});