## DigiVoter: Secure and Efficient Digital Voting System

DigiVoter is a modern, web-based application designed to revolutionize the voter registration and verification process. It leverages cutting-edge technologies like QR codes, simulated facial recognition, and secure data storage to enhance security, reduce fraud, and improve the overall efficiency of voting.

**Key Features:**

*   **Online Voter Registration:** Users can easily register online by providing their personal details (full name, ID number, date of birth, address, phone). The system guides users through a multi-step registration form.
*   **Timed Registration Window:** A built-in timer ensures that registrations can only be submitted during a specified period, adding another layer of control to the process.
*   **Unique Voter QR Codes:** Upon successful registration, each voter receives a unique QR code. This code contains the voter's identification information (Voter ID, Name, ID Number) and is essential for the verification process.
*   **QR Code Download:** Voters can download their QR code as a PNG file, making it readily accessible for verification.
*   **Simulated Verification Kiosk:** A demo feature simulates the in-person verification process at a voting kiosk. Voters can "scan" their QR code, and the system checks it against the registered data.
*   **Simulated Facial Recognition:** The verification process includes a simulated facial recognition step to add another layer of security, matching the voter presenting the QR code to the registered data.
*   **User-Friendly Interface:** The application is built with a clean, modern design and intuitive navigation, making the entire process user-friendly.
*   **Authentication:** Users can sign in and sign up to access the registration process.
*   **Error Handling:** The app handles errors effectively, providing clear feedback to the user if issues arise during the registration or verification process.
*   **Data Persistency:** the data is stored in the `localStorage` temporarily.
*   **Persistent Navigation:** A sticky navbar provides easy navigation between Home, Registration, and Verification pages.
* **Responsive Design**: the website is responsive for all type of devices.
* **Protected Routes:** Access to the registration is only possible after a successful signin.

**Why DigiVoter?**

*   **Enhanced Security:** The combination of QR codes, simulated facial recognition, and secure data storage significantly reduces the risk of voter fraud.
*   **Increased Efficiency:** Automating the verification process with QR codes and facial recognition is faster and more efficient than manual methods.
*   **Modern Experience:** The sleek UI and easy-to-use features make the voting process accessible and appealing to all users.
*   **Accessibility:** The online registration process makes the voting system more accessible.
*   **Reduced Errors:** Automated data validation during registration minimizes data entry errors.
* **Protected Routes:** Routes like `registration` are protected and can only be accessed after sign-in.

**How It Works:**

1.  **Registration:** Users create an account (sign up) and complete the registration form during the designated registration period.
2.  **QR Code Generation:** After successful registration, a unique QR code is generated and presented to the voter.
3.  **Verification:** At the polling station, voters scan their QR code at a kiosk.
4.  **Facial Recognition:** The system simulates facial recognition to match the voter with their registered data.
5.  **Voting:** If verification is successful, the voter proceeds to cast their vote.

## Technologies Used

*   **Frontend:**
    *   **React:** A JavaScript library for building user interfaces.
    *   **Vite:** A build tool for fast development and bundling.
    *   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
    *   **qrcode.react:** A React component to generate QR codes.
    *   **html-to-image:** To download qr codes as images.
    *   **react-router-dom:** A library for declarative routing in React applications.
    * **react-hot-toast:** to handle the toast messages (currently alert function is used).
    * **@tanstack/react-query:** to handle the queries.
    * **JSX:** to use HTML inside JS code.
    * **PostCSS:** to handle the styles.

*   **Backend:** (Planned)
    *   **Node.js:** A JavaScript runtime environment for server-side logic.
    *   **Express.js:** A minimal and flexible Node.js web application framework.

*   **Database:**
    *   **MongoDB:** A NoSQL document database for storing voter information securely.

* **Database connection**
    * **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.

*   **Development & Tools:**
    *   **Git:** Version control system.
    *   **ESLint:** JavaScript linter.
    *   **Prettier:** Code formatter.

* **Authentication**
    * **JWT (JSON Web Tokens)**: to handle the user authentication.
    * **bcrypt**: to hash the user password.

* **Deployment**
    * **Vercel or Netlify**: to deploy the frontend application.
    * **Heroku or AWS**: to deploy the backend application.
    
    * **deployment link (Frontend)**: https://digivoter.vercel.app/

*   **Other:**
    *   **localStorage:**  For temporary client-side data storage (currently used).

**Project Status:**

This project is currently a demo/proof-of-concept. It demonstrates the core functionalities of a digital voting system using QR codes and simulated facial recognition. Real-world implementation would require a robust backend system, a secure database (MongoDB), and further security enhancements.
There is also a signin and signup form for user authentication.

**Future Enhancements:**

*   **Real Facial Recognition:** Integrate a proper facial recognition library or API.
*   **Backend Integration:** Develop the backend with Node.js, Express.js, and connect it to MongoDB.
*   **Full Authentication:** Implement full user authentication with JWT.
*   **Enhanced Security:** Implement more robust data validation, sanitization, and encryption.
* **User dashboard**: each user will have a profile page
* **Database integration**: the app will use mongo to save the data.
* **Admin Panel**: A page for the admin.
* **Error handling**: Add more error handling.
* **Testing**: Add some tests.

