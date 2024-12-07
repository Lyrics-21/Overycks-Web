const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());

const userRouter = require('./routers/userRouter');
app.use('/Overycks/cuenta', userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor corriendo en Puerto: ${PORT}`));
