module.exports = {
  // Users
  GET_USER: 'CALL getUser(?, ?)',
  INSERT_USER: 'CALL insertUser(?, ?, ?, ?, ?, ?, ?)',
  UPDATE_USER: 'CALL updateUser(?, ?, ?, ?, ?, ?, ?, ?)',
  DELETE_USER: 'CALL deleteUser(?)',

  // Projects
  GET_PROJECT: 'CALL getProject(?, ?)',
  INSERT_PROJECT: 'CALL insertProject(?, ?, ?)',
  DELETE_PROJECT: 'CALL deleteProject(?)',

  // Roles
  GET_ROLES: 'CALL getroles()',
}
