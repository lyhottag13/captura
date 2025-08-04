@echo OFF
CALL npm ci
set /p host=What's the host IP? 
set /p user=What's the user? 
set /p password=What's the password? 
set /p database=What's the database? 

echo import { createPool } from "mysql2/promise";  >  db/db.js
echo const pool = createPool({                     >> db/db.js
echo  host: '%host%',                              >> db/db.js
echo  user: '%user%',                              >> db/db.js
echo  password: '%password%',                      >> db/db.js
echo  database: '%database%'                       >> db/db.js
echo });                                           >> db/db.js
echo export default pool;                          >> db/db.js

set /p appPassword=What's the password for the app? 
echo export default '%appPassword%'; > passwordWord.js

set /p port=What's the desired localhost port? 

echo export default %port%; > public\tools\port.js


CALL pm2 delete captura
CALL pm2 start server.js --name captura
CALL pm2 save
