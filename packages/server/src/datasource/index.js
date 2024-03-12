import dotenv from "dotenv";
import pg from "pg";
const Pool = pg.Pool;

dotenv.config();

//------------------------------------------------
const dbConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: +process.env.PG_PORT,
  ssl: true,
};
//------------------------------------------------
export class DataSource extends Pool {
  static instance;
  constructor() {
    super(dbConfig);
  }

  //------------------------------------------------
  static getInstance() {
    if (!DataSource.instance) {
      DataSource.instance = new DataSource();
    }

    return DataSource.instance;
  }
}

//------------------------------------------------
export const datasource = DataSource.getInstance();
