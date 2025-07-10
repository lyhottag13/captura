@echo OFF
set /p host=What's the host IP? 
set /p user=What's the user? 
set /p password=What's the password? 
set /p database=What's the database? 
cd db
echo import { createPool } from "mysql2/promise";  >  db.js
echo const pool = createPool({                     >> db.js
echo     host: '%host%',                           >> db.js
echo     user: '%user%',                           >> db.js
echo     password: '%password%',                   >> db.js
echo     database: '%database%'                    >> db.js
echo });                                           >> db.js
echo export default pool;
cd ..
set /p appPassword=What's the password for the app?
echo export default '%appPassword%'; > passwordWord.js
CALL pm2 delete captura
CALL pm2 start server.js --name captura