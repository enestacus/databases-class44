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
      CREATE TABLE IF NOT EXISTS research_papers(
          paper_id INT PRIMARY KEY,
          paper_title VARCHAR(255),
          conference VARCHAR(255),
          publish_date DATE
      )
  `,
  (error) => {
    if (error) {
      throw error;
    }
    console.log("The table research_papers created!");
  }
);

connection.query(
  `
      CREATE TABLE IF NOT EXISTS author_research(
          id INT PRIMARY KEY,  
          author_id INT,
          paper_id INT,
          FOREIGN KEY (author_id) REFERENCES authors(author_id),
          FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
      )
  `,
  (error) => {
    if (error) {
      throw error;
    }
    console.log("The table author_research created!");
  }
);

connection.query(
  `
       INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender, mentor) VALUES 
       (1, 'Author 1', 'University A', '1960-01-15', 12, 'Female', NULL),
       (2, 'Author 2', 'University E', '1963-01-17', 11, 'Male', NULL),
       (3, 'Author 3', 'University A', '1970-01-10', 7, 'Male', 1),
       (4, 'Author 4', 'University B', '1971-02-10', 5, 'Female', 1),
       (5, 'Author 5', 'University C', '1972-03-10', 4, 'Male', 2),
       (6, 'Author 6', 'University D', '1973-04-10', 2, 'Female', 2),
       (7, 'Author 7', 'University E', '1974-05-10', 6, 'Female', 1),
       (8, 'Author 8', 'University F', '1975-06-10', 3, 'Male', 1),
       (9, 'Author 9', 'University G', '1976-07-10', 3, 'Male', 2),
       (10, 'Author 10', 'University B', '1977-08-10', 7, 'Male', 2),
       (11, 'Author 11', 'University C', '1978-09-10', 8, 'Female', 3),
       (12, 'Author 12', 'University D', '1979-10-10', 3, 'Male', 3),
       (13, 'Author 13', 'University F', '1972-11-10', 5, 'Female', 4),
       (14, 'Author 14', 'University G', '1975-12-10', 9, 'Female', 5),
       (15, 'Author 15', 'University H', '1974-01-10', 4, 'Male', 6)
`,
  (error) => {
    if (error) {
      throw error;
    }
    console.log("Data inserted into authors table!");
  }
);

connection.query(
  `
        INSERT INTO research_papers (paper_id, paper_title, conference, publish_date) VALUES 
        (1, 'Research 1', 'Conference A', '2016-01-05'),
        (2, 'Research 2', 'Conference B', '2016-02-05'),
        (3, 'Research 3', 'Conference C', '2016-03-05'),
        (4, 'Research 4', 'Conference D', '2016-04-05'),
        (5, 'Research 5', 'Conference E', '2016-05-05'),
        (6, 'Research 6', 'Conference F', '2017-01-10'),
        (7, 'Research 7', 'Conference G', '2017-02-10'),
        (8, 'Research 8', 'Conference H', '2017-03-10'),
        (9, 'Research 9', 'Conference I', '2017-04-10'),
        (10, 'Research 10', 'Conference J', '2018-06-05'),
        (11, 'Research 11', 'Conference A', '2018-07-05'),
        (12, 'Research 12', 'Conference B', '2018-08-05'),
        (13, 'Research 13', 'Conference C', '2018-09-05'),
        (14, 'Research 14', 'Conference D', '2019-01-05'),
        (15, 'Research 15', 'Conference E', '2019-02-05'),
        (16, 'Research 16', 'Conference F', '2019-03-05'),
        (17, 'Research 17', 'Conference G', '2019-04-05'),
        (18, 'Research 18', 'Conference H', '2020-01-05'),
        (19, 'Research 19', 'Conference I', '2020-01-15'),
        (20, 'Research 20', 'Conference J', '2020-01-25'),
        (21, 'Research 21', 'Conference A', '2020-01-05'),
        (22, 'Research 22', 'Conference B', '2021-02-05'),
        (23, 'Research 23', 'Conference C', '2021-05-05'),
        (24, 'Research 24', 'Conference D', '2021-08-05'),
        (25, 'Research 25', 'Conference E', '2021-10-05'),
        (26, 'Research 26', 'Conference F', '2021-12-05'),
        (27, 'Research 27', 'Conference G', '2022-03-17'),
        (28, 'Research 28', 'Conference H', '2022-06-18'),
        (29, 'Research 29', 'Conference I', '2022-09-20'),
        (30, 'Research 30', 'Conference J', '2022-12-25')
`,
  (error) => {
    if (error) {
      throw error;
    }
    console.log("Data inserted into research_papers table!");
  }
);

connection.query(
  `
    INSERT INTO author_research(id, author_id, paper_id) VALUES
    (1, 1, 1),
    (2, 1, 2),
    (3, 2, 3),
    (4, 2, 4),
    (5, 3, 5),
    (6, 3, 6),
    (7, 4, 7),
    (8, 4, 8),
    (9, 5, 9),
    (10, 5, 10),
    (11, 6, 11),
    (12, 6, 12),
    (13, 7, NULL),
    (14, 8, 13),
    (15, 8, 14),
    (16, 8, 15),
    (17, 8, 16),
    (18, 9, 17),
    (19, 9, 18),
    (20, 10, 19),
    (21, 10, 20),
    (22, 11, 21),
    (23, 11, 22),
    (24, 12, 23),
    (25, 12, 24),
    (26, 12, 25),
    (27, 12, 26),
    (28, 13, NULL),
    (29, 14, 27),
    (30, 14, 28),
    (31, 15, 29),
    (32, 15, 30)
    `,
  (error) => {
    if (error) {
      throw error;
    }
    console.log("Data inserted into author_research table!");
  }
);

connection.end();
