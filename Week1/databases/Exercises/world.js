import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("Connected to the database!");
});

connection.query(
  "SELECT name FROM country WHERE population > 8000000",
  (error, result) => {
    if (error) {
      throw error;
    }
    console.log("Countries with population more than 8000000 listed below!");
    console.log(result.map((country) => country.name));
  }
);

connection.query(
  "SELECT name FROM country WHERE name LIKE '%land%'",
  (error, result) => {
    if (error) {
      throw error;
    }
    console.log("Countries consisting 'land' in their name listed below!");
    console.log(result.map((country) => country.name));
  }
);

connection.query(
  "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000",
  (error, result) => {
    if (error) {
      throw error;
    }
    console.log(
      "Cities with population between 500000 and 1000000 listed below!"
    );
    console.log(result.map((city) => city.name));
  }
);

connection.query(
  "SELECT name FROM country WHERE continent = 'europe'",
  (error, result) => {
    if (error) {
      throw error;
    }
    console.log("Countries located in europe listed below!");
    console.log(result.map((country) => country.name));
  }
);

connection.query(
  "SELECT name FROM country ORDER BY surfacearea DESC",
  (error, result) => {
    if (error) {
      throw error;
    }
    console.log(
      "Countries listed below in descending order according to the surface area!"
    );
    console.log(result.map((country) => country.name));
  }
);

connection.query(
  "SELECT name FROM city WHERE countrycode = 'NLD'",
  (error, result) => {
    if (error) {
      throw error;
    }
    console.log("Cities in Netherlands listed below!");
    console.log(result.map((city) => city.name));
  }
);

connection.query(
  "SELECT population FROM city WHERE name = 'rotterdam'",
  (error, result) => {
    if (error) {
      throw error;
    }
    console.log(`The population of Rotterdam is ${result[0].population}!`);
  }
);

connection.query(
  "SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10",
  (error, result) => {
    if (error) {
      throw error;
    }
    console.log("Top 10 countries in the aspect of surface area listed below!");
    console.log(result.map((country) => country.name));
  }
);

connection.query(
  "SELECT name FROM city ORDER BY population DESC LIMIT 10",
  (error, result) => {
    if (error) {
      throw error;
    }
    console.log("The most crowded 10 cities listed below!");
    console.log(result.map((city) => city.name));
  }
);

connection.query(
  "SELECT SUM(population) as total FROM country",
  (error, result) => {
    if (error) {
      throw error;
    }
    console.log(`Total population of the world is ${result[0].total}!`);
  }
);

connection.end();
