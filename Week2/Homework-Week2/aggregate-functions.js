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
      SELECT rp.paper_title, COUNT(ar.author_id) AS num_authors
      FROM research_papers AS rp
      LEFT JOIN author_research AS ar ON rp.paper_id = ar.paper_id
      GROUP BY rp.paper_id`,
  (err, results) => {
    if (err) throw err;
    console.log("Research papers and number of authors logged!");
    console.table(results);
  }
);

connection.query(
  `
      SELECT SUM(rp_count) AS total_researches_by_female_authors
      FROM (
        SELECT COUNT(ar.paper_id) AS rp_count
        FROM authors AS a
        LEFT JOIN author_research AS ar ON a.author_id = ar.author_id
        WHERE a.gender = 'Female'
        GROUP BY a.author_id
      ) AS female_research_counts`,
  (err, results) => {
    if (err) throw err;
    console.log(
      `Total research by female authors is ${results[0].total_researches_by_female_authors}!`
    );
  }
);

connection.query(
  `
      SELECT university, AVG(h_index) AS avg_h_index
      FROM authors
      GROUP BY university`,
  (err, results) => {
    if (err) throw err;
    console.log("Average h-index per university logged!");
    console.table(results);
  }
);

connection.query(
  `
      SELECT a.university, SUM(rp_count) AS total_researches
      FROM authors AS a
      LEFT JOIN (
        SELECT ar.author_id, COUNT(ar.paper_id) AS rp_count
        FROM author_research AS ar
        GROUP BY ar.author_id
      ) AS author_research_counts ON a.author_id = author_research_counts.author_id
      GROUP BY a.university`,
  (err, results) => {
    if (err) throw err;
    console.log("Total research per university logged!");
    console.table(results);
  }
);

connection.query(
  `
      SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
      FROM authors
      GROUP BY university`,
  (err, results) => {
    if (err) throw err;
    console.log("Min and max h-index per university logged!");
    console.table(results);
  }
);

connection.end();
