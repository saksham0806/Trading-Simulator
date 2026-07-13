import pg from "pg";
async function fetchDataByName(name) {
  // Define your PostgreSQL connection details
  const client = new pg.Client({
    user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "6A2A7171",
  port: 5432,
  });

  try {
    // Connect to the database
    await client.connect();

    // Define the SQL query with a parameterized query
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [name];

    // Execute the query
    const result = await client.query(query, values);

    // Return the fetched rows
    return result.rows;
    console.log(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    return [];
  } finally {
    // Close the database connection
    await client.end();
  }
}

// Example usage
fetchDataByName('pratyay2004majhi@gmail.com')
  .then(data => console.log(data))
  .catch(error => console.error(error));

