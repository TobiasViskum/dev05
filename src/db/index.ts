import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

const connection = connect({
  url: 'mysql://b7nj8uusmxs422do3ips:pscale_pw_u2buNhYAeNel0YZ9ZBli292A3AloEL0QmVq4A7aL8M0@aws.connect.psdb.cloud/viskum-db?ssl={"rejectUnauthorized":true}',
});

export const db = drizzle(connection);
