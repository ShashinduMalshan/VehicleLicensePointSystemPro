# Vehicle License Point System (VLPS)

## 1. Project Description

The Vehicle License Point System (VLPS) is a comprehensive, web-based dashboard designed for traffic authorities and system administrators to efficiently manage a driver's license demerit point system. The primary goal of this project is to provide a centralized, data-driven platform that enhances road safety by tracking driver violations, managing penalties, and overseeing remedial actions.

VLPS replaces manual or fragmented processes with a streamlined, user-friendly interface. It empowers administrators to monitor real-time statistics, manage driver records, log violations instantly, handle license suspensions with a clear case-management workflow, and ensure accountability through a robust notification and reporting system. By providing clear insights and powerful administrative tools, VLPS aims to improve enforcement efficiency, promote safer driving habits, and ensure transparency in the demerit point process.

---

## 2. Key Features

The system is packed with features designed for a seamless administrative experience:

*   **📊 Interactive Dashboard:** A dynamic overview page presenting key performance indicators at a glance. It includes statistics on total drivers, active violations, and average points, visualized through interactive charts for violations over time, violation types, new driver registrations, and driver risk distribution.

*   **👤 Comprehensive Driver Management:** A complete directory of all drivers in the system. Features a searchable and paginated table displaying license numbers, names, contact information, total points, and current status (Active, Suspended, Probation).

*   **✍️ Real-time Violation Logging:** An intuitive form for authorized officers to log new traffic violations. It includes fields for officer ID, license numbers, law details, and descriptions. The form is enhanced with utility features like a GPS button to auto-fill the location.

*   **⚖️ Suspended License Case Management:** An advanced, two-pane interface for managing suspended licenses. Administrators can filter cases by reason, view detailed case files including the triggering violation, track a multi-step reinstatement checklist, review a case timeline, and log all communications with the driver.

*   **🎓 Training Program Oversight:** A dedicated module to manage drivers assigned to remedial training programs. It lists all participants, their assigned program, and start date, with a simple one-click action to mark training as complete, which updates the driver's record.

*   **🔔 Automated Notification Center:** A centralized hub to view a history of all automated communications sent to drivers, such as high-point warnings, suspension notices, and fine payment reminders. Notifications can be filtered by type and sorted by date.

*   **⚙️ Secure Profile & Admin Management:** A secure settings page where administrators can update their profile information, change their password, and manage other system administrators. This includes a secure workflow for adding and removing admin privileges with password confirmation.

*   📱 **Responsive Design:** The entire application is fully responsive, offering a seamless experience on both desktop and mobile devices, with a dedicated mobile-friendly sidebar and navigation.

---

## 3. System Architecture

The application follows a modern client-server architecture, decoupling the frontend presentation layer from the backend business logic.

```
+--------------------------+          +-------------------------+          +----------------------+
|   Browser (User)         |          |   Backend Server        |          |   Database           |
|--------------------------|          |-------------------------|          |----------------------|
|   - HTML / Tailwind CSS  |          |   - Spring Boot         |          |   - MySQL /          |
|   - jQuery / JavaScript  |  <-----> |   - Spring Security (JWT) |  <-----> |     PostgreSQL       |
|   - Chart.js             |          |   - REST API Endpoints  |          |   - Driver Data      |
|                          |          |   - Business Logic      |          |   - Violation Records|
+--------------------------+          +-------------------------+          +----------------------+
         (Client)                       (REST API Communication)                 (Persistence)
```

---

## 4. Technologies Used

**Frontend:**
*   **HTML5:** The standard markup language for creating the web page structure.
*   **Tailwind CSS:** A utility-first CSS framework (delivered via CDN) for rapid and responsive UI development.
*   **JavaScript (ES6):** The core programming language for client-side logic and interactivity.
*   **jQuery:** A feature-rich JavaScript library used to simplify DOM manipulation, event handling, and AJAX requests.
*   **Chart.js:** A powerful and easy-to-use charting library for creating responsive and animated data visualizations.

**Backend (Assumed):**
*   **Java:** A robust, object-oriented programming language.
*   **Spring Boot:** A framework for creating stand-alone, production-grade Spring-based applications with minimal configuration.
*   **Spring Security:** Provides authentication and authorization, configured here to use JSON Web Tokens (JWT) for stateless, secure API communication.
*   **Spring Data JPA (Hibernate):** Simplifies data access layer implementation for relational databases.
*   **Maven:** A powerful project management and comprehension tool for building and managing the project dependencies.
*   **MySQL / PostgreSQL:** A reliable open-source relational database for data persistence.

---

## 5. Setup Instructions

Follow these steps to get the full application running on your local machine for development and testing.

### Prerequisites

*   **Java JDK:** Version 11 or higher.
*   **Apache Maven:** For building the backend project.
*   **Database Server:** An active instance of MySQL or PostgreSQL.
*   **IDE:** A modern IDE like IntelliJ IDEA or Visual Studio Code is recommended.
*   **Git:** For cloning the repository.
*   **Node.js (Optional):** For using modern frontend tools like Live Server.

### Backend Setup (Spring Boot)

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>/backend 
    ```

2.  **Configure the database:**
    *   Create a new database schema/database in your SQL server (e.g., `vlps_db`).
    *   Open `src/main/resources/application.properties`.
    *   Update the following properties to match your database configuration:
        ```properties
        spring.datasource.url=jdbc:mysql://localhost:3306/vlps_db
        spring.datasource.username=your_db_user
        spring.datasource.password=your_db_password
        spring.jpa.hibernate.ddl-auto=update
        ```
    *   Set your unique JWT secret key for security:
        ```properties
        jwt.secret.key=your-very-secret-and-long-jwt-key
        ```

3.  **Build and Run:**
    *   Build the project to download all dependencies:
        ```bash
        mvn clean install
        ```
    *   Run the application:
        ```bash
        mvn spring-boot:run
        ```
    *   The backend server will start on `http://localhost:8080`. You can test it by visiting this URL in your browser.

### Frontend Setup

The frontend is a static application but should be served by a web server to handle API requests correctly.

1.  **Install a local web server (if you don't have one):**
    *   The recommended tool is the **Live Server** extension for Visual Studio Code.
    *   Alternatively, you can use Node.js `http-server`: `npm install -g http-server`.

2.  **Configure API URL:**
    *   Open the `index.html` file.
    *   Inside the `<script>` tag at the bottom, find all instances of `http://localhost:8080`.
    *   If your backend is running on a different URL, update it here.

3.  **Launch the Application:**
    *   **Using VS Code Live Server:** Right-click the `index.html` file and select "Open with Live Server".
    *   **Using `http-server`:** Navigate to the project's root directory in your terminal and run `http-server`. Then open your browser to the provided URL (e.g., `http://127.0.0.1:8081`).

---

## 6. API Endpoints

The frontend communicates with the backend via the following REST API endpoints:

| Method | Endpoint                      | Description                                        |
|--------|-------------------------------|----------------------------------------------------|
| `GET`  | `/api/v1/driver/all`          | Fetches a list of all drivers in the system.       |
| `GET`  | `/api/v1/violation/all`       | Fetches a list of all violations.                  |
| `POST` | `/api/v1/violation`           | Logs a new violation (assumed from form).          |
| `GET`  | `/api/v1/training/all`        | Fetches all drivers currently in training programs.|
| `DELETE`| `/api/v1/training/{driverId}` | Marks a driver's training program as complete.     |
| `POST` | `/api/v1/auth/signin`         | Authenticates a user and returns a JWT (assumed).  |

---

## 7. Usage

A typical workflow for an administrator:
1.  **Login:** The user authenticates through a login page to receive a JWT.
2.  **Dashboard Review:** The user lands on the **Overview** page to get a high-level summary of the system's status.
3.  **Log a Violation:** The user navigates to the **Violations** page, fills in the details of a traffic offense, and submits the form.
4.  **Manage a Case:** The user goes to the **Suspended Licenses** page, selects a driver, reviews their case history, updates their reinstatement checklist, and logs a communication.
5.  **Complete Training:** The user navigates to **Training Programs**, selects a driver who has finished their course, and clicks "Complete Training" to update their status.

---

## 8. Screenshots

*These are placeholder images. Replace them with actual screenshots of your running application.*

**Overview Dashboard**
![Overview Dashboard](https://via.placeholder.com/800x450.png?text=Overview+Dashboard+Screenshot)

**Driver Management Page**
![Driver Management](https://via.placeholder.com/800x450.png?text=Driver+Management+Screenshot)

**Suspended License Case File**
![Suspended License Management](https://via.placeholder.com/800x450.png?text=Suspended+License+Case+File)


---

## 9. Link to the Demo Video

A video demonstration of the project, showcasing its features and functionality.

**[Watch the Demo on YouTube](https://www.youtube.com/watch?v=your_video_id)**
*(Please replace the link with your actual YouTube video URL)*
