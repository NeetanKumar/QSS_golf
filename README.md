
# QSS_golf

Welcome to QSS_golf, a platform where golf aspirants meet professional coaches


## Features
This project is built using the MERN stack (MongoDB, Express, Node.js) and provides a feature-rich environment.

Following features are incorporated:

* Authentication: Users & coaches can signup and log in using JWT-based authentication.

* Creating courses and lectures: Coaches can create courses and add lectures to them.

* Booking lectures: Authenticated users can buy any lectures available.

* Retrieving bookings: Coaches can look up to bookings made of their lectures while users can check all the bookings they have made


## Installation
Download the code from the repository, unzip it and open the project in VSCode. 
Now navigate to main directory and run following command to install dependencies
```bash
  npm init -y 
```
```bash
  npm install
```
```bash
  npm install --save-dev nodemon
```    
In the root of your project, create a .env file for environment variables

#### Environment Variables

To run this project, you will need to add the following environment variables to your .env file(make .env file in your main folder)

`MONGO_URI=mongodb+srv://username:password@cluster0.ikrvq.mongodb.net/AlphaTribe `

`JWT_SECRET=yoursecretkey`

`PORT=5000`

Open package.json and modify it to

```bash
  "scripts": {

  "start": "node index.js",

  "dev": "nodemon index.js",

  "test": "echo \"Error: no test specified\" && exit 1"

} 
```
Replace Mongo DB url in .env to your own URL you got from Mongo DB compass

Now run the project by:
```bash
  npm run dev 
```
## Documentation
Postman documentation is attached here:

[API Documentation from postman](https://documenter.getpostman.com/view/37292852/2sAXqs8hnm)

