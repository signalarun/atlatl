// config/config.js
'use strict'

let ENV_VARS = ['NODE_ENV', 'PORT', 'APP_NAME'];
// required environment variables
ENV_VARS.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`)
  }
})

const config = {
  env: process.env.NODE_ENV,
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    enabled: process.env.BOOLEAN ? process.env.BOOLEAN.toLowerCase() === 'true' : false
  },
  server: {
    port: Number(process.env.PORT)
  }
  // ...
}

module.exports = config