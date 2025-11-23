# Human Resource Management System (HRMS) — MERN Stack

A full-stack Human Resource Management System (HRMS) built with React, Node.js, Express, and MongoDB Atlas.
It allows organisations to manage employees, teams, assignments, and maintain a complete audit log of all actions (login, CRUD, assignments).

## 🚀 Features

- ✅ Organisation registration & admin login
- ✅ Secure authentication with JWT + bcrypt
- ✅ CRUD operations for Employees and Teams
- ✅ Many-to-many Employee ↔ Team assignment
- ✅ Full audit logging for:

  - User login / logout

  - Employee & Team creation / updates / deletions

  - Employee ↔ Team assignment changes
- ✅ Protected APIs with middleware
- ✅ Responsive React UI styled with Tailwind CSS

## 🧱 Tech Stack
| Layer          | Technology                      |
| -------------- | ------------------------------- |
| Frontend       | React + Vite + Tailwind CSS     |
| Backend        | Node.js + Express               |
| Database       | MongoDB Atlas (Mongoose ODM)    |
| Authentication | JWT + bcrypt                    |
| Logging        | MongoDB “logs” collection       |
| Dev tools      | Nodemon, dotenv, morgan, Helmet |

## 📂 Folder Structure
``` 
human-resource-management-system-mern/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── index.js
│   │   └── seed.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## ⚙️ Setup Instructions
1️⃣ Clone the repository
```
git clone https://github.com/Maheeth1/hrms-mern.git
cd human-resource-management-system-mern
```
2️⃣ Setup MongoDB Atlas

- Create a free cluster on MongoDB Atlas

- Create a database user (e.g. hrms_user).

- Allow access from anywhere (0.0.0.0/0).

- Copy the connection string from “Connect → Connect your application”.

3️⃣ Backend setup
```
cd backend
npm install
```

Create a .env file:
```
PORT=5000
MONGODB_URI=mongodb+srv://hrms_user:<password>@cluster0.mongodb.net/hrms_db?retryWrites=true&w=majority
JWT_SECRET=super_secret_key
JWT_EXPIRES=8h
CORS_ORIGIN=http://localhost:5173
```

Start server:
```
npm run dev
```

Expected:
```
✅ MongoDB connected
API on :5000
```
4️⃣ Frontend setup
```
cd ../frontend
npm install
npm run dev
```

Open browser → http://localhost:5173

Login using the seeded credentials.

## 🧠 API Reference
| Method        | Endpoint                      | Description                           |
| ------------- | ----------------------------- | ------------------------------------- |
| **Auth**      |                               |                                       |
| POST          | `/api/auth/register`          | Register new organisation + admin     |
| POST          | `/api/auth/login`             | Login                                 |
| POST          | `/api/auth/logout`            | Logout (logs the action)              |
| **Employees** |                               |                                       |
| GET           | `/api/employees`              | List all employees                    |
| POST          | `/api/employees`              | Create employee                       |
| PUT           | `/api/employees/:id`          | Update employee                       |
| DELETE        | `/api/employees/:id`          | Delete employee                       |
| **Teams**     |                               |                                       |
| GET           | `/api/teams`                  | List all teams                        |
| POST          | `/api/teams`                  | Create team                           |
| PUT           | `/api/teams/:id`              | Update team                           |
| DELETE        | `/api/teams/:id`              | Delete team                           |
| POST          | `/api/teams/:teamId/assign`   | Assign employee                       |
| POST          | `/api/teams/:teamId/unassign` | Unassign employee                     |
| **Logs**      |                               |                                       |
| GET           | `/api/logs`                   | View all logs (latest 100 by default) |

All routes (except /auth/*) require Authorization: Bearer <JWT>.

## 📜 Logging (Audit Trail)

Every backend operation generates a log entry in the logs collection:

| Action                      | Example meta                               |
| --------------------------- | ------------------------------------------ |
| `user_logged_in`            | `{}`                                       |
| `user_logged_out`           | `{}`                                       |
| `employee_created`          | `{ "employeeId": "6740..." }`              |
| `team_created`              | `{ "teamId": "6740..." }`                  |
| `employee_assigned_to_team` | `{ "employeeId": "...", "teamId": "..." }` |
| `employee_updated`          | `{ "employeeId": "..." }`                  |
| `team_deleted`              | `{ "teamId": "..." }`                      |

You can view them via API:
```
GET /api/logs
GET /api/logs?action=employee_created
```

or in MongoDB Atlas → logs collection.

## 🖥️ Frontend Pages
| Page           | Description                              |
| -------------- | ---------------------------------------- |
| **/register**  | Create organisation + admin              |
| **/login**     | Admin login                              |
| **/employees** | Employee CRUD                            |
| **/teams**     | Team CRUD + assignment                   |
| **/logs**      | (Optional) Shows all backend log entries |

## 🔒 Security

- Passwords hashed using bcrypt (10 salt rounds)

- JWTs with 8h expiry

- Protected routes require token validation

- Organisation ID isolation ensures one org can’t access another’s data

- Helmet + CORS + morgan for extra safety

## 📊 Example demo flow

- Register organisation → auto login.

- Create a few employees.

- Create a team.

- Assign employees to teams.

- Check logs:

  - via GET /api/logs

  - or in the logs tab in MongoDB Atlas.

## 🧩 Future Enhancements

- Role-based access (Admin / HR / Viewer)

- Advanced analytics dashboard

- Pagination and search

- Email notifications

- Employee performance tracking

- Docker setup for deployment

## 👨‍💻 Developer

Maheeth Thotakura
MERN Developer | Backend & Full-stack Enthusiast
📧 thotakuramaheeth@gmail.com

## 🪄 License

This project is open source under the MIT License.
