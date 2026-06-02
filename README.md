# blockchain_certificate_verification
A web-based certificate verification system using blockchain built with HTML, CSS, JavaScript, Node.js, Express, and MongoDB that uses SHA-256 hashing to detect fake or altered university certificates.


# Certificate Verification System

A secure web-based certificate verification system developed using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

The system uses SHA-256 hashing technology to verify the authenticity of university certificates and detect fake or altered certificates.

---

## Features

- Certificate issuance and registration
- SHA-256 certificate fingerprint generation
- Certificate verification system
- Fake certificate detection
- Admin dashboard
- Verification logs
- Student certificate management
- Secure file handling
- MongoDB database integration
- Responsive user interface

---

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Other Technologies
- SHA-256 Hashing
- Multer (File Upload Handling)

---

## How the System Works

### Certificate Issuing Process

1. Admin uploads a student's certificate.
2. The system generates a SHA-256 hash fingerprint from the uploaded file.
3. The hash fingerprint and student details are stored in MongoDB.
4. The certificate becomes officially registered.

### Certificate Verification Process

1. Employer or verifier uploads a certificate.
2. The system generates a new hash fingerprint from the uploaded certificate.
3. The system retrieves the original hash stored in the database.
4. Both hashes are compared.
5. If the hashes match, the certificate is valid.
6. If the hashes do not match, the certificate is fake or altered.

---

## System Modules

- Authentication Module
- Certificate Issuing Module
- Certificate Verification Module
- Verification Logs Module
- Admin Dashboard Module
- Hash Generation Engine

---


# RECOMMENDED MINIMUM PAGES

For a solid final year project, these pages are enough:

Home Page
About Page
Admin Login
Admin Dashboard
Issue Certificate Page
Manage Certificates Page
Verify Certificate Page
Verification Result Page
Verification Logs Page

