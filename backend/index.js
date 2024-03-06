require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const phoneRoutes = require('./router/phoneRoutes');
const userRoutes = require('./router/userRoutes');


app.use(bodyParser.urlencoded({ extended: false }));

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  define: {
    freezeTableName: true
  }
});

app.use(cors());
app.use(bodyParser.json());

app.use('/phones', phoneRoutes);
app.use('/users', userRoutes);

sequelize.sync();

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;