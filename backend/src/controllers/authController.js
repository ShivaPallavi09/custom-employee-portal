const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

// Login Endpoint
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, as: 'roles' }]
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid credentials or inactive account' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Extract the primary role name (assuming 1 role per user for this portal's logic)
    const userRole = user.roles.length > 0 ? user.roles[0].name : 'Employee';

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: userRole },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: userRole }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Bootstrap First Admin User (Temporary endpoint to setup the system)
exports.createFirstAdmin = async (req, res) => {
  try {
    const adminCount = await User.count();
    if (adminCount > 0) {
      return res.status(400).json({ message: 'System already initialized. Use Admin panel to create users.' });
    }

    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword, name });
    
    // Assign Admin role
    const adminRole = await Role.findOne({ where: { name: 'Admin' } });
    if (adminRole) {
      await user.addRole(adminRole);
    }

    res.status(201).json({ message: 'Initial Admin user created successfully', user: { email, name } });
  } catch (error) {
    console.error('Bootstrap error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};