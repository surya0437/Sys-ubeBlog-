**SysǪube Blog** is a fictional blog website focused on technology-related articles. The project involves creating a full-stack blog application with comprehensive CRUD functionality using Laravel and React. Key features and requirements for the application include:

#### Admin Dashboard
- **User Authentication**: Users must be able to log in to the system.
- **Post Management**: Users can create, read, update, and delete blog posts.
- **Security**: Users are blocked after three failed login attempts.
- **Authorization**: Implement robust user authentication and authorization mechanisms.
- **Data Integrity**: Ensure data validation and sanitization throughout the application.

#### Frontend (Landing Page)
- **Article Display**: Show all published articles on the landing page.
- **Article Details**: Provide a detailed view for each article.

#### Blog Post Page
- **Form Fields**:
  - Title
  - Slug
  - Description
  - Status (Published, Draft)
  - Blog Image

#### Technology Stack
- **Frontend**:
  - HTML
  - CSS (including any libraries or frameworks)
  - JavaScript (ReactJS or VueJS)
- **Backend**:
  - PHP (Laravel Framework)
- **Database**:
  - MySQL


#### Required software before runing project 
    install xamp
    install composer
    install node js
    start xamp server

### Frontend Setup
    open terminal and navigate to folder "Frontend"
    Run following command
        npm install
        npm run dev

### Backend Setup
    open terminal and navigate to folder "Backend"
    Run following command
        composer install
        copy .env.example .env (You can change the database name after creating env file)
        php artisan key:generate
        php artisan migrate
        php artisan jwt:secret
        npm install
        npm run dev
        php artisan serve


### Now run the project on 
    http://localhost:5173