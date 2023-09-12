import { getContinentInfoByYearAndAge } from "./aggregate.js";
import { getTotalPopulationByYear } from "./aggregate.js";
import { connectToDatabase } from "./connect.js";
import { closeConnection } from "./connect.js";

async function runTests() {
  try {
    await connectToDatabase();

    const year = 2020;
    const age = "100+";

    const continentInfoResult = await getContinentInfoByYearAndAge(year, age);
    console.log("Continent Info by Year and Age:");
    console.log(continentInfoResult);

    const countryName = "Algeria";

    const totalPopulationResult = await getTotalPopulationByYear(countryName);
    console.log("Total Population by Year:");
    console.log(totalPopulationResult);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    closeConnection();
  }
}

runTests();