import knex from 'knex';

const connection = knex({
  client: 'mysql',
  connection:{
    host:"localhost",
    user: "root",
    password: "",
    database: "menagerie"
  },
  useNullAsDefault: true,
});

export default connection;