'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');
const bcrypt = require('bcryptjs');


const User = sequelize.define('users', {
  id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING,
  allowNull: true
   },
   fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.first_name} ${this.last_name}`;
    },
    set(value) {
      throw new Error('Do not try to set the `fullName` value!');
    },
  },
   email:{
    type: DataTypes.STRING,
  allowNull: true,
  unique: true,
  },
  password: {
    type: DataTypes.STRING,
  allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
  allowNull: true
  },
  city: {
    type: DataTypes.STRING,
  allowNull: true
  },
  state: {
    type: DataTypes.STRING,
  allowNull: true
  },
  zip:{
    type: DataTypes.STRING,
  allowNull: true
  },
  address: {
    type: DataTypes.STRING,
  allowNull: true
  },
  role: {
    type: DataTypes.STRING,
  allowNull: true
  },
  avatar:{
    type: DataTypes.STRING,
  allowNull: true
  },
  permission: {
    type: DataTypes.STRING,
  allowNull: true
  },
  permission: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  points:{
    type: DataTypes.INTEGER,
    allowNull:true
  }
  });

  // Hash password before saving
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

sequelize.sync().then(() => {
  console.log('Image table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = User;

