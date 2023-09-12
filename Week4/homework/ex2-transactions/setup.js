import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = "transaction";

async function setup() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);

    await db.collection("accounts").deleteMany({});

    const accounts = [
      {
        account_number: 101,
        balance: 20000,
        account_changes: [
          {
            change_number: 1,
            amount: 20000,
            changed_date: new Date(),
            remark: "Current balance",
          },
        ],
      },
      {
        account_number: 102,
        balance: 25000,
        account_changes: [
          {
            change_number: 1,
            amount: 25000,
            changed_date: new Date(),
            remark: "Current balance",
          },
        ],
      },
    ];

    await db.collection("accounts").insertMany(accounts);

    console.log("Sample data inserted into MongoDB");
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
    console.log("Connection to MongoDB closed");
  }
}

export default setup;