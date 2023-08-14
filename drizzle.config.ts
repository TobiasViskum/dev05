import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    connectionString:
      'mysql://b7nj8uusmxs422do3ips:pscale_pw_u2buNhYAeNel0YZ9ZBli292A3AloEL0QmVq4A7aL8M0@aws.connect.psdb.cloud/viskum-db?ssl={"rejectUnauthorized":true}',
  },
  breakpoints: true,
} satisfies Config;
