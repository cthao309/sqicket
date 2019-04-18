module.exports = {
  // Users
  GET_USER: 'CALL getUser(?, ?)',
  INSERT_USER: 'CALL insertUser(?, ?, ?, ?, ?, ?, ?, ?)',
  UPDATE_USER: 'CALL updateUser(?, ?, ?, ?, ?, ?, ?, ?)',
  DELETE_USER: 'CALL deleteUser(?)',

  // Projects
  GET_PROJECT: 'CALL getProject(?, ?)',
  INSERT_PROJECT: 'CALL insertProject(?, ?, ?)',
  DELETE_PROJECT: 'CALL deleteProject(?)',
  UPDATE_PROJECT: 'CALL updateProject(?, ?, ?, ?)',

  // Roles
  GET_ROLE: 'CALL getRole()',

  // Assignments
  GET_ASSIGNMENT: 'CALL getAssignment(?, ?)',
  INSERT_ASSIGNMENT: 'CALL insertAssignment(?, ?)',
  DELETE_ASSIGNMENT: 'CALL deleteAssignment(?, ?)',

  // Issues
  // INSERT_ISSUE:

}
