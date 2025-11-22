import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Organisation from './models/Organisation.js';
import User from './models/User.js';
import Employee from './models/Employee.js';
import Team from './models/Team.js';
import EmployeeTeam from './models/EmployeeTeam.js';

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  // Clear old data (optional — careful!)
  await Promise.all([
    Organisation.deleteMany({}),
    User.deleteMany({}),
    Employee.deleteMany({}),
    Team.deleteMany({}),
    EmployeeTeam.deleteMany({})
  ]);

  // 1️⃣ Create Organisation
  const org = await Organisation.create({ name: 'TechNova Solutions' });

  // 2️⃣ Create Admin Users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin1 = await User.create({
    organisationId: org._id,
    name: 'Alice Johnson',
    email: 'alice@technova.com',
    passwordHash: adminPassword
  });

  const admin2 = await User.create({
    organisationId: org._id,
    name: 'Bob Williams',
    email: 'bob@technova.com',
    passwordHash: adminPassword
  });

  // 3️⃣ Create Employees
  const employees = await Employee.insertMany([
    { organisationId: org._id, firstName: 'John', lastName: 'Doe', email: 'john@technova.com', phone: '9876543210' },
    { organisationId: org._id, firstName: 'Mary', lastName: 'Smith', email: 'mary@technova.com', phone: '8765432190' },
    { organisationId: org._id, firstName: 'David', lastName: 'Lee', email: 'david@technova.com', phone: '7654321980' },
    { organisationId: org._id, firstName: 'Sophia', lastName: 'Patel', email: 'sophia@technova.com', phone: '6543219870' },
    { organisationId: org._id, firstName: 'Ethan', lastName: 'Brown', email: 'ethan@technova.com', phone: '5432198760' }
  ]);

  // 4️⃣ Create Teams
  const [frontend, backend, marketing] = await Team.insertMany([
    { organisationId: org._id, name: 'Frontend Team', description: 'Responsible for UI development' },
    { organisationId: org._id, name: 'Backend Team', description: 'Handles APIs and database' },
    { organisationId: org._id, name: 'Marketing Team', description: 'Promotes the product' }
  ]);

  // 5️⃣ Assign Employees to Teams
  await EmployeeTeam.insertMany([
    { organisationId: org._id, employeeId: employees[0]._id, teamId: frontend._id },
    { organisationId: org._id, employeeId: employees[1]._id, teamId: frontend._id },
    { organisationId: org._id, employeeId: employees[2]._id, teamId: backend._id },
    { organisationId: org._id, employeeId: employees[3]._id, teamId: backend._id },
    { organisationId: org._id, employeeId: employees[4]._id, teamId: marketing._id }
  ]);

  console.log('✅ Seed data inserted successfully');
  console.log('Organisation:', org.name);
  console.log('Admins:', [admin1.email, admin2.email]);
  console.log('Employees:', employees.map(e => e.email));
  console.log('Teams:', [frontend.name, backend.name, marketing.name]);

  await mongoose.disconnect();
  console.log('🔌 Disconnected from MongoDB');
}

seed().catch(err => console.error('❌ Seed failed:', err));
