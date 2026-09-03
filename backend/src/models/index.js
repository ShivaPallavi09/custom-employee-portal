const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// 1. Users Table
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// 2. Roles Table
const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

// 3. Permissions Table
const Permission = sequelize.define('Permission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

// 4. UserRoles Table
const UserRole = sequelize.define('UserRole', {}, { timestamps: false });

// 5. RolePermissions Table
const RolePermission = sequelize.define('RolePermission', {}, { timestamps: false });

// 6. AuditLogs Table
const AuditLog = sequelize.define('AuditLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  action: { type: DataTypes.STRING, allowNull: false }, // e.g., 'LOGIN', 'ZOHO_API_CALL'
  resource: { type: DataTypes.STRING }, 
  details: { type: DataTypes.TEXT },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

// Setup Associations
User.belongsToMany(Role, { through: UserRole, as: 'roles' });
Role.belongsToMany(User, { through: UserRole, as: 'users' });

Role.belongsToMany(Permission, { through: RolePermission, as: 'permissions' });
Permission.belongsToMany(Role, { through: RolePermission, as: 'roles' });

User.hasMany(AuditLog, { foreignKey: 'userId', as: 'auditLogs' });
AuditLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Function to seed initial required roles (Step 2 Requirement)
const seedDatabase = async () => {
  const rolesToSeed = ['Admin', 'HR', 'Sales', 'Support', 'Finance'];
  for (const roleName of rolesToSeed) {
    await Role.findOrCreate({ where: { name: roleName } });
  }
};

module.exports = {
  sequelize,
  User,
  Role,
  Permission,
  UserRole,
  RolePermission,
  AuditLog,
  seedDatabase
};