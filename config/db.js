module.exports={
  "host"     : ( process.env.DB_HOST ) ? process.env.DB_HOST : '127.0.0.1',
  "port"     : ( process.env.DB_PORT ) ? process.env.DB_PORT : "3306",
  "user"     : ( process.env.DB_USER ) ? process.env.DB_USER : 'api',
  "password" : ( process.env.DB_PASS ) ? process.env.DB_PASS : 'pass',
  "database" : ( process.env.DB_NAME ) ? process.env.DB_NAME : 'sdg',
  "connections" : ( process.env.DB_CONNECTIONS ) ? process.env.DB_CONNECTIONS : 10,
  "queueLimit" : (process.env.DB_QUEUE_LIMIT) ? process.env.DB_QUEUE_LIMIT : 50
}
