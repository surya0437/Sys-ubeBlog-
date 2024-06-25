Required software before runing project 
    install xamp
    install composer
    install node js


Frontend Setup
    open terminal and navigate to folder "Frontend"
    Run following command
        npm install
        cp .env.example .env
        npm run dev

Backend Setup
    open terminal and navigate to folder "Backend"
    Run following command
        composer install
        cp .env.example .env
        php artisan key:generate
        php artisan migrate
        npm install
        npm run dev
        php artisan serve


Now run the project on 
    http://localhost:5173