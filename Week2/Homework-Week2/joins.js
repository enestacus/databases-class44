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
    SELECT a.author_name AS author, m.author_name AS mentor 
    FROM authors AS a 
    LEFT JOIN authors AS m ON a.mentor = m.author_id;
`,
  (error, result) => {
    if (error) {
      throw error;
    }
    console.log("Authors and mentors logged!");
    console.table(result);
  }
);

connection.query(
  `
    SELECT a.*, rp.paper_title 
    FROM authors AS a 
    LEFT JOIN author_research AS ar ON a.author_id = ar.author_id 
    LEFT JOIN research_papers AS rp ON ar.paper_id = rp.paper_id;
`,
  (error, result) => {
    if (error) {
      throw error;
    }
    console.log("Authors and their researches logged!");
    console.table(result);
  }
);

connection.end();
