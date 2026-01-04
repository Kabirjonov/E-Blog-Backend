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
GET: /api/user/getAll // give all user list
GET: /api/user/getById/:id //give one special user with id
DELETE: /api/user/delete/:id // delete user with id
PUT: /api/user/edit/:id // change user information with id and new information

Auth:
POST: /api/auth/register // there is we registering new user with information (username, email,password, picture file,bio) and return refresh token
POST: /api/auth/login // login with email and password and return refresh token
POST: /api/auth/logout // logout and clear cookies
GET: /api/auth/refresh // get refresh token

Article:
COMMINT there is no server side pagination yet
GET /api/article/getAll // get all article
POST /api/article/create create new article
PUT: /api/article/edit/:id update article
DELETE: /api/article/delete/:id delete article
