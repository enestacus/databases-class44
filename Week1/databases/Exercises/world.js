import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

const queries = [
  "SELECT name FROM country WHERE population > 8000000",
  "SELECT name FROM country WHERE name LIKE '%land%'",
  "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000",
  "SELECT name FROM country WHERE continent = 'europe'",
  "SELECT name FROM country ORDER BY surfacearea DESC",
  "SELECT name FROM city WHERE countrycode = 'NLD'",
  "SELECT population FROM city WHERE name = 'rotterdam'",
  "SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10",
  "SELECT name FROM city ORDER BY population DESC LIMIT 10",
  "SELECT SUM(population) as total FROM country",
];

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("Connected to the database!");

  executeQueries();
});

function executeQueries() {
  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];
    connection.query(query, (error, result) => {
      handleQueryResult(error, result, query);
    });
  }
}

function handleQueryResult(error, result, query) {
  if (error) {
    console.error(`Error executing query: ${query}`);
    throw error;
  }

  console.log(`Query executed: ${query}`);

  if (query.startsWith("SELECT name FROM country WHERE population > 8000000")) {
    console.log("Countries with population more than 8000000 listed below!");
    console.log(result.map((country) => country.name));
  } else if (
    query.startsWith("SELECT name FROM country WHERE name LIKE '%land%'")
  ) {
    console.log("Countries consisting 'land' in their name listed below!");
    console.log(result.map((country) => country.name));
  }

  if (queries.indexOf(query) === queries.length - 1) {
    connection.end();
  }
}
