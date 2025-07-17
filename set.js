const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0g2aGx1R2w3UXR0Z1E1TUVRSW4rYXRSZFRiSFRmYzFYSUlTS1hKbjRsRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY29KbStKU3E4UUNzc2orbHlPTXNQaUtIMkJ5Rk5RVU5nSjhIdkZVUW8xaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4RXhWLzV4Nld2MUlKNDZSeWxsaW9adS90c29LVTlIZUl6c2xwdnFpeVdRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPZExSSHJUSVkycnZNdnpLQ015UGM2aUNvM3ROYW9tRldHT3NsbVZkbTM4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9BK2NiUXFHWitDdWhyKzQ3Z0JUUkpVbEdQcXowZ2IyMXNrZEQ0VnArV2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNlSTg3RC9ZKzdjb2JGVXZWQ2ZTUE5oaDdCS0Jsa3dieWQrQjNMQWUyUkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVBvNWxMcVhveThJWlAvRkF6ZWpLRmxZRkh3a1RCQmlTa2lJSTZOdFcwUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWGdGMlM5OVlHTVc5MkhNN1ZMTnRxb3BIMVc0NXlUdDJBR3RORUJlUWhtYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRuTDBlY05zUnpvQS82dkNZMzZzck05TFNrNlc5bTREVVVQWmNSOEJBcVhmcVY3cmxrWHNxZjBDeWJib0xNblVnQkJ1RFB6L1IxNUtXamp3OFVYTmdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI4LCJhZHZTZWNyZXRLZXkiOiJRbE5WUGFReklObXVKSGtWNUFUWVpETEJFUmx2N1pqQnIyWGVNL0o4NW1jPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcxMDI2MzAzNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3QzZGODg5NjZDOTY2MkU5QUNENzBFOTk3NjhFOTc2MCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyNDA4MTk5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MTAyNjMwMzRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTdGNDAwODEwNkNFRkYxNDM4NjFDRTRBRTVFQUZBQjgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MjQwODE5OX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoibXRIeGdIVnlSbGlxTVhqYlJDQW1pUSIsInBob25lSWQiOiIyZjgyY2FmZC1mNzMwLTQwMjgtODhkMC02N2QzYmNiZDE3NGUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicytYcDk0d253cmJrcTRVK3pMQk5rQ3RGQjY0PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhsbUtydDZvWnFYekNnTTZ6cUdoS2tFaHg0dz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJBQkNEMTIzNCIsIm1lIjp7ImlkIjoiMjU0NzEwMjYzMDM0OjU5QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTQyNTg5MDU1NDg0MTAwOjU5QGxpZCIsIm5hbWUiOiLila3inZbilojwk4apIFNvbmljIHB1bHNlIPCThqog4paI4p2WIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQWDd4OEFCRVBYQXpzTUdHQTBnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJCMGpyMEh6eEg0K0VJK3VjcVhOVUJTb0pjbW9ITmFEN05CUkhveG9XNEU4PSIsImFjY291bnRTaWduYXR1cmUiOiJuN0NuMitrVTZDbThveDJtSUVSWGV3MUlhYUhsNWdldm5QbVU2ZEthcXNhVE4rZGh1Y2NYVEwwS1hVRkRIMUFaWUNTM2ZjSXlrRm5XTGQ5dGQybUJEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiK1hTU2JmR1cxWENQeHZCK204THJWMlVKQkM2L3dSRVdYK0VQdkRNWHVCVEprVXpIM21kWmNSSUYxTFFxV0t0Rmlvakl2TGV3TDJDS042cHBtTmtlamc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MTAyNjMwMzQ6NTlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUWRJNjlCODhSK1BoQ1BybktselZBVXFDWEpxQnpXZyt6UVVSNk1hRnVCUCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUyNDA4MTk0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5RcyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "R_Brian",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254710263034",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "no",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Brian-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
