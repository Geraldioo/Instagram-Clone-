const { Redis } = require("ioredis");

const redis = new Redis({
  port: 18970,
  host: 'redis-18970.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
  username: "default",
  password: process.env.REDIS_PASS,
  db: 0,
});

module.exports = redis;