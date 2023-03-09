const { createClient } = require("redis");

const config = {
  socket: {
    host: "redis",
  },
};

const insertInRedis = async (token) => {
  const client = createClient(config);

  client.on("error", (error) => {
    throw new Error(error);
  });

  await client.connect();
  await client.set("token", token);
  await client.disconnect();
};

const getFromRedis = async () => {
  const client = createClient(config);

  client.on("error", (error) => {
    throw new Error(error);
  });

  await client.connect();
  const value = await client.get("token");
  await client.disconnect();

  return value;
};

module.exports = { insertInRedis, getFromRedis };
