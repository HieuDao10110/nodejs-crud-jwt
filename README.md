# nodejs-crud-jwt

Build some APIs using nodejs, mysql.

Authorization, authentication using jwt with role.

Requirements
- NPM
- Nodejs
- Mysql
- Git

Clone project
```
git clone https://git.lumi.vn/hieudv/nodejs-crud-jwt.git
cd nodejs-crud-jwt
```

Config connection mysql
Create a database
Open `.env` file and change to your mysql information

Project setup
```
npm install
```

Run 
\
In the first run app, open the file `app.js` and 
change method `asyncDatabase(false)` -> `asyncDatabase(true)` and run:

```
pm2 start app.js
```
After that set to `asyncDatabase(false)` in next times 
\
\
Note:
Import file: `crud.postman_collection.json`
in `root` directory to Postman (Collection v2.1)
for test API