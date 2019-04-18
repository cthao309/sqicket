const mysql = require('mysql');
const dbconfig = require('../config/database');
const spNames = require('./spNames');

// establish connection to mysql database
const connection = mysql.createConnection(dbconfig.connection);
connection.query(`USE ${dbconfig.database}`);

module.exports = {

  // USER FUNCTIONS
  getUser: (
    userId,
    username,
    cb,
  ) => {
    connection.query(
      spNames.GET_USER,
      [userId, username],
      cb,
    )
  },

  insertUser: (
    username,
    firstName,
    lastName,
    password,
    email,
    comments,
    roleId,
    cb,
  ) => {
    connection.query(
      spNames.INSERT_USER,
      [username, firstName, lastName, password, email, comments, roleId],
      cb,
    )
  },

  updateUser: (
    userId,
    username,
    firstName,
    lastName,
    hashedPassword,
    email,
    comments,
    roleId,
    cb,
  ) => {
    connection.query(
      spNames.UPDATE_USER,
      [
        userId,
        username,
        firstName,
        lastName,
        hashedPassword,
        email,
        comments,
        roleId,
      ],
      cb,
    )
  },

  deleteUser: (
    userId,
    cb,
  ) => {
    connection.query(
      spNames.DELETE_USER,
      [userId],
      cb,
    )
  },

  // PROJECTS FUNCTIONS
  getProject: (
    projectId,
    projectName,
    cb,
  ) => {
    connection.query(
      spNames.GET_PROJECT,
      [projectId, projectName],
      cb,
    )
  },

  insertProject: (
    projectName,
    projectDescription,
    createdByUserId,
    cb,
  ) => {
    connection.query(
      spNames.INSERT_PROJECT,
      [projectName, projectDescription, createdByUserId],
      cb,
    )
  },

  deleteProject: (
    projectId,
    cb,
  ) => {
    connection.query(
      spNames.DELETE_PROJECT,
      [projectId],
      cb,
    )
  },

  updateProject: (
    projectId,
    projectName,
    projectDescription,
    createdByUserId,
    cb,
  ) => {
    connection.query(
      spNames.UPDATE_PROJECT,
      [projectId, projectName, projectDescription, createdByUserId],
      cb,
    )
  },

  // ROLE FUNCTIONS
  getRole: (
    cb,
  ) => {
    connection.query(
      spNames.GET_ROLE,
      cb,
    )
  },

  // ASSIGNMENT FUNCTIONS
  getAssignment: (
    userId,
    projectId,
    cb,
  ) => {
    connection.query(
      spNames.GET_ASSIGNMENT,
      [userId, projectId],
      cb,
    )
  },

  insertAssignment: (
    userId,
    projectId,
    cb,
  ) => {
    connection.query(
      spNames.INSERT_ASSIGNMENT,
      [userId, projectId],
      cb,
    )
  },

  deleteAssignment: (
    userId,
    projectId,
    cb,
  ) => {
    connection.query(
      spNames.DELETE_ASSIGNMENT,
      [userId, projectId],
      cb,
    )
  },
}
