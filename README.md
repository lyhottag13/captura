# Assembly Line Quality Inspection Web App
## General Info
This project is a web app designed to allow an operator on the assembly line to input the quality of various components on the Breville Espresso Machine, created for Coto Technology in Mexicali, B.C.
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
2. Extract its contents.
3. Enter the root file (so that this README is visible) and enter the terminal.
#### To Run Local Instance
Run these commands in your terminal to ensure you have the correct tools installed.
```
npm -v
node -v
```
Then run these commands in sequence to run the app:
```
npm ci
node server.js
``` 
Now there is a local instance of the app running on your machine. If the host machine does not have a firewall restriction on the host port (e.g. 80, 3000, 8080, or whichever you decide), then any machine connected to the same local network will be able to access the web app.
4. Configure a custom password in password.js. The default is 'password'.
5. Find the IP address of the host machine.
Enter this command into Command Prompt:
```
ipconfig /all
```
Look for a line similar to this:
```
IPv4 Address. . . . . . . . . . . : 192.168.X.X
```
By writing this IP address and the host port into the address bar of a browser (e.g ```192.168.1.130:3000```), then any machine on the local network can connect to the local webapp.
### MySQL Database
Only required if you're setting one up from scratch. Coto Technologies should already have one, if not, consult IT.
1. Download and install the [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) and [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) apps from the official MySQL site.
2. Inside of MySQL, enter the Local Instance. Login with the user and password you created.
3. Paste this command into the center box, then click the lightning bolt to execute. This command creates a table named breville with 50 steps, an ID column, a notes column, and a date column.
```
CREATE TABLE `sys`.`breville` (
  `id` VARCHAR(45) NOT NULL,
  `s1` VARCHAR(45) NULL,
  `s2` VARCHAR(45) NULL,
  `s3` VARCHAR(45) NULL,
  `s4` VARCHAR(45) NULL,
  `s5` VARCHAR(45) NULL,
  `s6` VARCHAR(45) NULL,
  `s7` VARCHAR(45) NULL,
  `s8` VARCHAR(45) NULL,
  `s9` VARCHAR(45) NULL,
  `s10` VARCHAR(45) NULL,
  `s11` VARCHAR(45) NULL,
  `s12` VARCHAR(45) NULL,
  `s13` VARCHAR(45) NULL,
  `s14` VARCHAR(45) NULL,
  `s15` VARCHAR(45) NULL,
  `s16` VARCHAR(45) NULL,
  `s17` VARCHAR(45) NULL,
  `s18` VARCHAR(45) NULL,
  `s19` VARCHAR(45) NULL,
  `s20` VARCHAR(45) NULL,
  `s21` VARCHAR(45) NULL,
  `s22` VARCHAR(45) NULL,
  `s23` VARCHAR(45) NULL,
  `s24` VARCHAR(45) NULL,
  `s25` VARCHAR(45) NULL,
  `s26` VARCHAR(45) NULL,
  `s27` VARCHAR(45) NULL,
  `s28` VARCHAR(45) NULL,
  `s29` VARCHAR(45) NULL,
  `s30` VARCHAR(45) NULL,
  `s31` VARCHAR(45) NULL,
  `s32` VARCHAR(45) NULL,
  `s33` VARCHAR(45) NULL,
  `s34` VARCHAR(45) NULL,
  `s35` VARCHAR(45) NULL,
  `s36` VARCHAR(45) NULL,
  `s37` VARCHAR(45) NULL,
  `s38` VARCHAR(45) NULL,
  `s39` VARCHAR(45) NULL,
  `s40` VARCHAR(45) NULL,
  `s41` VARCHAR(45) NULL,
  `s42` VARCHAR(45) NULL,
  `s43` VARCHAR(45) NULL,
  `s44` VARCHAR(45) NULL,
  `s45` VARCHAR(45) NULL,
  `s46` VARCHAR(45) NULL,
  `s47` VARCHAR(45) NULL,
  `s48` VARCHAR(45) NULL,
  `s49` VARCHAR(45) NULL,
  `s50` VARCHAR(45) NULL,
  `notes` VARCHAR(500) NULL,
  `fecha` VARCHAR(100) NULL,
  PRIMARY KEY (`id`));
```
4. Configure the settings in the project file `db.js` to match the machine's settings. Usually, only user and password have to be changed.
5. Use the web app as normal.
## Folder Structure
```
/db
/node_modules
├── You
├── 
```
