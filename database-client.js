const { Client } = require('pg');
const client = new Client({
  user: 'ma_storage_user',
  host: 'dpg-chhivv5269v0od6nvak0-a.oregon-postgres.render.com',
  database: 'ma_storage',
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl:true
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports =client;
