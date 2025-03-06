# 📚 Institute Management System

Welcome to the **InstituteBeeProject**, a web application built using **Node.js, Express.js**, and **HTML/CSS** to manage student, staff, and admin functionalities efficiently. This project is designed to streamline academic processes, including attendance tracking, course management, and user authentication.

---

## 📊 Project Overview

```mermaid
%%{init: {'theme': 'default', 'themeVariables': { 'fontSize': '12px'}, 'flowchart': {'nodeSpacing': 15, 'rankSpacing': 25}}}%%
graph TD
    A[InstituteBeeProject] --> B[User Management]
    A --> C[Course Management]
    A --> D[Attendance System]
    A --> E[Announcements]
    B --> B1[Authentication]
    B --> B2[Role-based Access]
    B --> B3[User Profiles]
    C --> C1[Course Creation]
    C --> C2[Enrollment]
    C --> C3[Grade Management]
    D --> D1[Record Attendance]
    D --> D2[Generate Reports]
    E --> E1[Create Announcements]
    E --> E2[Notification System]
```

---

## 🚀 Features

- **User Authentication**: Secure login and registration system.
- **Role-Based Dashboards**: Dedicated views for students, staff, and admin users.
- **Dynamic Student Dashboard**: Displays personalized student information and courses.
- **Attendance Tracking**: View and update attendance records.
- **Course Management**: Access course details dynamically.
- **Secure Routing & Middleware**: Express.js handles authentication and error management.
- **Announcements**: System for sharing important updates.
- **Contact Us**: Direct communication channel for support.

---

## 📂 Project Structure

```
📁 InstituteBeeProject
 ├── 📁 middleware             # Authentication and other middleware
 │   └── auth.js               # Authentication middleware
 ├── 📁 public                 # Static files (HTML, CSS, JS)
 │   ├── adminDashboard.html   # Admin control panel
 │   ├── anouncement.html      # Announcements page
 │   ├── attendance.html       # Attendance management
 │   ├── contactus.html        # Contact form
 │   ├── courseMngmnt.html     # Course management
 │   ├── error.html            # Error page
 │   ├── index.html            # Landing page
 │   ├── login.html            # Login page
 │   ├── register.html         # Registration page
 │   ├── staffDashboard.html   # Staff portal
 │   ├── studentDashboard.html # Student portal
 │   ├── users.json            # Stores user data
 ├── 📁 routes                 # API and page routing
 │   ├── api.js                # API endpoints
 │   ├── auth.js               # Authentication routes
 │   ├── pages.js              # Page routing
 ├── server.js                 # Main Express.js server
 ├── serverold.js              # Previous server version
 ├── package.json              # Project dependencies
 ├── package-lock.json         # Locked dependencies
 ├── README.md                 # Project documentation
 ├── ST1 Project Guideline.txt # Phase 1 guidelines
 ├── ST2 Project Guideline.txt # Phase 2 guidelines
```


---

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast and minimal web framework
- **HTML/CSS** - Frontend UI structure
- **JavaScript (ES6+)** - Interactive client-side scripting
- **Helmet, Morgan, CORS** - Middleware for security and logging

## 📊 Technology Stack

```mermaid
%%{init: {'theme': 'default', 'themeVariables': { 'fontSize': '10px'}, 'flowchart': {'nodeSpacing': 15, 'rankSpacing': 20}}}%%
graph LR
    A[Client Side] --> B[HTML]
    A --> C[CSS]
    A --> D[JavaScript]
    E[Server Side] --> F[Node.js]
    E --> G[Express.js]
    H[Middleware] --> I[Authentication]
    H --> J[Logging]
    H --> K[Security]
    L[Data Storage] --> M[JSON Files]
    L --> N[Future: DB]
```

---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Anuj-er/InstituteBeeProject.git
   ```
2. Navigate to the project directory:
   ```sh
   cd InstituteBeeProject
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   node server.js
   ```
5. Open in browser:
   ```sh
   http://localhost:8080
   ```


---


## 📌 API Endpoints

| Method | Endpoint              | Description                 |
|--------|----------------------|-----------------------------|
| GET    | `/`                  | Home Page                   |
| GET    | `/login`             | Login Page                  |
| GET    | `/register`          | Registration Page           |
| GET    | `/studentDashboard`  | Student Dashboard           |
| GET    | `/staffDashboard`    | Staff Dashboard             |
| GET    | `/adminDashboard`    | Admin Dashboard             |
| GET    | `/api/user`          | Fetch logged-in user data   |
| GET    | `/api/courses`       | Fetch student courses       |
| GET    | `/announcements`     | View announcements          |
| GET    | `/contactus`         | Contact page                |

## 🔄 API Architecture

```mermaid
%%{init: {'theme': 'default', 'themeVariables': { 'fontSize': '10px'}, 'flowchart': {'nodeSpacing': 10, 'rankSpacing': 20}}}%%
graph LR
    A[Client] --> B[Routes Layer]
    B --> C[Controllers]
    C --> D[Service Layer]
    D --> E[Data Storage]
    F[Middleware] --> B
    subgraph "Routes"
    B1[pages.js] 
    B2[api.js]
    B3[auth.js]
    end
    B --> B1
    B --> B2
    B --> B3
```

---

## 🏗️ Future Enhancements

- 🔹 **Database Integration** (Replace `users.json` with MongoDB/PostgreSQL)
- 🔹 **Advanced Course & Attendance Management**
- 🔹 **Notification System** for students and staff
- 🔹 **Responsive Design** for mobile accessibility
- 🔹 **Analytics Dashboard** for tracking performance metrics

## 📊 Development Roadmap

```mermaid
%%{init: {'theme': 'default', 'themeVariables': { 'fontSize': '10px', 'ganttLeftPadding': 5}}}%%
gantt
    title Roadmap
    dateFormat  YYYY-MM-DD
    section Phase 1
    Core Functionality      :done, 2023-01-01, 2023-02-15
    User Authentication     :done, 2023-02-16, 2023-03-01
    section Phase 2
    Enhanced Dashboards     :active, 2023-03-02, 2023-04-15
    Course Management       :active, 2023-03-15, 2023-04-30
    section Phase 3
    Database Integration    :2023-05-01, 2023-06-15
    Notification System     :2023-06-16, 2023-07-15
    section Phase 4
    Analytics Dashboard     :2023-07-16, 2023-08-31
    Mobile Responsiveness   :2023-08-01, 2023-09-15
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo, open an issue, or submit a pull request.

Visit our [GitHub repository](https://github.com/Anuj-er/InstituteBeeProject) to contribute.


---

## 📜 License

This project is open-source and available under the MIT License.

Happy coding! 🚀
