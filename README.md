About This Project

This is a simple Node.js and Express backend project that I am building to improve and refresh my knowledge. It is not for any commercial use — just a personal project to practice and learn more about backend development.

I am using this project to:

    Review and strengthen my understanding of Node.js and Express

    Learn better coding practices

    Experiment with different backend features

I hope this project helps me become more confident in building APIs and working with backend technologies.


API:
two token refresh and access
User:
     get: /api/user/getAll          // give all user list
     get: /api/user/getById/:id      //give one special user with id
     delete: /api/user/delete/:id   // delete user with id
     put:   /api/user/edit/:id      // change user information with id and new information
     
Auth:
    post:  /api/auth/register       // there is we registering new user with information (username, email,password, picture file,bio) and return refresh token
    post:  /api/auth/login          // login with email and password  and return refresh token
    post:  /api/auth/logout         // logout and clear cookies 
    get:   /api/auth/refresh        // get refresh token 
    
Article:
    get: /api/article/getGroup     //get 9 articles 
    get  /api/article/getOne/:id   // get with id
    post 