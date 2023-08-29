import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2hw",
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("Connected to the week2hw database!");
});

connection.query(
  `
    CREATE TABLE IF NOT EXISTS authors(
        author_id INT PRIMARY KEY,
        author_name VARCHAR(255),
        university VARCHAR(255),
        date_of_birth DATE,
        h_index INT,
        gender VARCHAR(255)
    )
`,
  (error) => {
    if (error) {
      throw error;
    }
    console.log("The table authors created!");
  }
);

connection.query(
  `
    ALTER TABLE authors
    ADD COLUMN mentor INT,
    ADD FOREIGN KEY (mentor) REFERENCES authors(author_id)

`,
  (error) => {
    if (error) {
      throw error;
    }
    console.log("The column mentor added!");
  }
);

connection.end();
