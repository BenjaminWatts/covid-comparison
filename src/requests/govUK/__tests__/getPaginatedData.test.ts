import { getPaginatedData } from "../getPaginatedData"
jest.setTimeout(1000 * 60)

test("getPaginatedData", async () => {
  const filters = ["areaType=ltla"]
  const structure = {
    date: "date",
    areaName: "areaName",
    newDeaths28DaysByDeathDate: "newDeaths28DaysByDeathDate",
    newCasesBySpecimenDate: "newCasesBySpecimenDate",
    cumCasesBySpecimenDateRate: "cumCasesBySpecimenDateRate",
    cumDeaths28DaysByDeathDate: "cumDeaths28DaysByDeathDate",
    cumDeaths28DaysByDeathDateRate: "cumDeaths28DaysByDeathDateRate",
  }
  const result = await getPaginatedData(
    filters,
    structure,
    "cumDeaths28DaysByDeathDateRate"
  )
})
