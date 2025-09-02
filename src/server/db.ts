// Oracle DB config
const techDB = process.env.TECH_DB || '';
const userDB = process.env.USER_DB;

const techPart = techDB ? `_${techDB}` : '';
const baseKey = `DBCP_RAC8_${userDB}${techPart}`;

export const dbConfig = {
  user: process.env[`${baseKey}_USERNAME`],
  password: process.env[`${baseKey}_PASSWORD`],
  schema: process.env[`${baseKey}_SCHEMA`],
  connectString: process.env[`${baseKey}_URL`],
};
