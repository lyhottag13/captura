# ASSEMBLY LINE PRODUCTION DOCUMENTATION APP
## General Info
This project is a web app designed to allow an operator on the assembly line to input the status of various components on the Breville Espresso Machine, created for Coto Technology in Mexicali, B.C.
The web app connects to a local database using mysql2, then sends the status of each check into that database. There are various spots for input validation, so that an operator doesn't accidentally input incorrect information.
## Features
- Insert information into a database
- Use from any device in the local network
- Password protected
## Technologies
Project is created with:
| Technology | Usage                    | Version     |
|------------|--------------------------|-------------|
| Node.js    | Backend runtime          | `v22.16.0`  |
| Express    | Web framework            | `v5.1.0`    |
| MySQL      | Database engine          | `v8.4.0`    |
| mysql2     | MySQL client for Node.js | `v3.x`      |
| HTML5      | Markup                   | N/A         |
| CSS3       | Styling                  | N/A         |
| JavaScript | Frontend scripting       | `ES6+`      |
| npm        | Package manager          | `v10.x`     |
| Git        | Version control          | latest      |
## Installation/Setup
### Web App
1. Download the zip from the green button that says code.
1. Extract its contents.
1. Enter the root file (so that this README is visible) and enter the terminal.
#### To Run Local Instance
Run this command in your terminal to ensure you have the correct tools installed.
```npm -v```
```node -v```
Then run this command to run the app:
```node server.js``` 
Now there is a local instance of the app running on your machine. If the host machine does not have a firewall restriction on the host port (e.g. 80, 3000, 8080), then any machine connected to the same local network will be able to access the web app.
### MySQL Database
Download and install the [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) and [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) apps from the official MySQL site.