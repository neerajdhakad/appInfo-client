# AppInfo - Appliation Information

## Description

This project is a web application built using Vite with React for the frontend and ASP.NET Core for the backend. The frontend uses Tailwind CSS for styling.

## Table of Contents

- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
 

## Getting Started

### Prerequisites

- React.js (v18 or higher)
- .NET SDK (v8)
- Azure Storage Account (for file uploads)

### Frontend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/neerajdhakad/appInfo-client.git
   cd appInfo-client
   ```
2. **Install the dependedncies**
    ```javascript 
    npm install
    ```
### Environment Variables

3. **Create a .env File**
    ```env
    AZURE_STORAGE_CONNECTION_STRING=your_connection_string
    AZURE_STORAGE_CONTAINER_NAME=your_container_name
    ```
### Backend Setup
4. **Build and Run the Backend**
   ```bash
   https://github.com/air12345678/appInfo-api.git
   ```

5. **Run the Frontend**
   ```bash
    npm run dev
   ```