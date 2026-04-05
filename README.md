# Finance Dashboard Backend

A robust, secure Node.js/Express/MongoDB backend designed for financial data management. This system features strict Role-Based Access Control (RBAC), advanced data aggregation, and optimized API performance.

## 🚀 Key Features
- **User & Role Management:** Secure registration and login with **JWT Authentication** and password hashing via **Bcrypt**.
- **Role-Based Access Control (RBAC):** Granular permission layers for Admin, Analyst, and Viewer roles.
- **Advanced Finance CRUD:** Full management of transactions with **Soft Delete** functionality to prevent accidental data loss.
- **Dashboard Analytics:** High-performance financial summaries (Net Balance, Category Totals) powered by **MongoDB Aggregation Pipelines**.
- **Optimized Listings:** Built-in **Pagination** and **Search** support to handle large datasets efficiently.

## 🛠 Technical Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Security:** JSON Web Tokens (JWT), BcryptJS
- **Validation:** Internal Mongoose Schema Validation

## 🔐 Access Levels & Permissions
| Feature | Viewer | Analyst | Admin |
| :--- | :---: | :---: | :---: |
| **View Records** | ✅ | ✅ | ✅ |
| **Search & Filter** | ✅ | ✅ | ✅ |
| **View Analytics/Insights** | ❌ | ✅ | ✅ |
| **Create/Edit/Delete** | ❌ | ❌ | ✅ |

## ⚙️ Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd finance-dashboard-backend

2. **Install Dependencies:**
    ```code
    npm install

    Environment Configuration:
    Create a .env file in the root directory and add the following:

    ```code
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_random_secret_key

3. **Run the Server:**

    Development mode: ```console
    npm run dev
    ```

    Production mode: ```console
    npm start
    ```

## 📝 Design Decisions & Assumptions
- **Soft Delete:** Implemented an isDeleted flag for records. This ensures data can be recovered if necessary and maintains database integrity for historical reporting.

- **Aggregation Over Processing:** Calculated financial totals directly within MongoDB using Aggregation Pipelines. This reduces the memory load on the Node.js server.

- **Stateless Auth:** Used JWT to ensure the backend remains scalable and doesn't require server-side session storage.

- **Role Hierarchy:** Assumed a strict hierarchy where the Admin is the only "Write" authority, ensuring the financial ledger remains untampered with.

## 📂 Project Structure
```text
finance-dashboard-backend/
├── src/
│   ├── config/             # Database connection logic
│   │   └── db.js
│   ├── controllers/        # Business logic & Route handlers
│   │   ├── authController.js
│   │   ├── recordController.js
│   │   └── dashboardController.js
│   ├── middleware/         # Auth & RBAC guards
│   │   └── auth.js
│   ├── models/             # Mongoose Schemas (User, Record)
│   │   ├── User.js
│   │   └── Record.js
│   ├── routes/             # API Endpoint definitions
│   │   ├── authRoutes.js
│   │   ├── recordRoutes.js
│   │   └── dashboardRoutes.js
│   ├── utils/              # Helper functions (JWT generation)
│   │   └── generateToken.js
│   └── app.js              # Main Entry Point
├── .env                    # Environment Variables (Ignored by Git)
├── .gitignore              # Files to exclude from Git
├── package.json            # Dependencies & Scripts
└── README.md               # Project Documentation
```

## 🧪 API Endpoints
**Authentication**
$POST /api/auth/register$ - Create a new user (Body: name, email, password, role)

$POST /api/auth/login$ - Authenticate and get token (Body: email, password)

**Financial Records**
$GET /api/records$ - Fetch records (Supports ?page=1&limit=10&search=text&type=income)

$POST /api/records$ - Create record (Admin only)

$PUT /api/records/:id$ - Update record (Admin only)

$DELETE /api/records/:id$ - Soft delete record (Admin only)

**Dashboard Analytics**
$GET /api/dashboard/summary$ - Get totals & balance (Admin/Analyst)

$GET /api/dashboard/categories$ - Get category breakdown (Admin/Analyst)