const UserRole = require("../constant/userRole.enum");

function permissionUserRole(userRole) {
  const PermissionUserRole = UserRole.find((role) => {
    return role.name === userRole;
  });
  return PermissionUserRole;
}

module.exports = permissionUserRole;
