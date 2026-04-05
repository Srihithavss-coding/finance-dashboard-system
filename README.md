# Finance Dashboard Backend

A robust, secure (Node.js/Express/MongoDB) backend designed for financial data management. This system features strict Role-Based Access Control (RBAC), advanced data aggregation, and optimized API performance.

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
    ```
    npm install
    ```
    
    Environment Configuration:
    Create a .env file in the root directory and add the following:

    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_random_secret_key
    ```

3. **Run the Server:**

    Development mode: ``` npm run dev```

    Production mode: ``` npm start ```

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

## 📖 API Documentation & Usage Guide

To test the API, use a tool like **Postman** or **Thunder Client**. All protected routes require a Bearer Token in the headers: `Authorization: Bearer <your_jwt_token>`.

### **1. Authentication**
| Method | Endpoint | Description | Body (JSON) |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new user | `{"name", "email", "password", "role"}` |
| `POST` | `/api/auth/login` | Get Auth Token | `{"email", "password"}` |

### **2. Financial Records (RBAC Protected)**
| Method | Endpoint | Role Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/records` | Viewer/Analyst/Admin | Fetch all records (Supports `?search=`, `?page=`) |
| `POST` | `/api/records` | **Admin** | Create a new record |
| `PUT` | `/api/records/:id` | **Admin** | Update an existing record |
| `DELETE` | `/api/records/:id` | **Admin** | Soft delete a record |

### **3. Dashboard Analytics**
| Method | Endpoint | Role Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/dashboard/summary` | **Analyst/Admin** | Total Income, Expense, and Net Balance |
| `GET` | `/api/dashboard/categories` | **Analyst/Admin** | Breakdown of spending by category |

---
## API Documentation URL:
The API is fully documented using Swagger/OpenAPI. Once the server is running locally, the interactive documentation is available at: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## 🛠 How to Test (Step-by-Step)
1. **Register/Login:** Use the `/auth` endpoints to get a token.
2. **Set Header:** In your API client, add a Header: `Authorization` with the value `Bearer [Paste Token Here]`.
3. **Access Analytics:** Try accessing `/api/dashboard/summary` with a **Viewer** token (it should fail with 403) and then with an **Admin** token (it should succeed).
