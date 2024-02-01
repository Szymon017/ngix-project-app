const { Sequelize, DataTypes } = require('sequelize');
const { database, username, password, host, dialect } = require('../config/sqlConfig');

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
});

const User = sequelize.define('User', {
  // Definicja atrybutów
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Synchronizuj bazę danych (utwórz tabelę, jeśli nie istnieje)
sequelize.sync();

module.exports = User;
