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

  const queries = [
    {
      sql: `
        SELECT a.author_name AS author, m.author_name AS mentor 
        FROM authors AS a 
        LEFT JOIN authors AS m ON a.mentor = m.author_id;
      `,
      message: "Authors and mentors logged!",
    },
    {
      sql: `
        SELECT a.*, rp.paper_title 
        FROM authors AS a 
        LEFT JOIN author_research AS ar ON a.author_id = ar.author_id 
        LEFT JOIN research_papers AS rp ON ar.paper_id = rp.paper_id;
      `,
      message: "Authors and their researches logged!",
    },
  ];

  executeQueries(queries);
});

function executeQueries(queries) {
  queries.forEach((queryObj, index) => {
    const { sql, message } = queryObj;
    connection.query(sql, (error, result) => {
      handleQueryResult(error, result, message);
      if (index === queries.length - 1) {
        connection.end();
      }
    });
  });
}

function handleQueryResult(error, result, message) {
  if (error) {
    console.error(`Error executing query: ${message}`);
    throw error;
  }
  console.log(message);
  console.table(result);
}
