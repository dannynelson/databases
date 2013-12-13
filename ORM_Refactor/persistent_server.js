var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('chat', 'DNSA', '4321');

exports.Messages = sequelize.define('Messages', {
  username: Sequelize.STRING(20),
  text: Sequelize.STRING(160),
  // createdAt: Sequelize.DATE,
  // updatedAt: Sequelize.DATE,
  roomname: Sequelize.STRING(20)
});

exports.Messages.sync({force:true});