import { getPaginatedData } from "./getPaginatedData"

type AreaType = "ltla" | "utla"

type LatestOptions = {
  areaType: AreaType
}

export type LatestDataItem = {
  date: string
  areaName: string
  newDeaths28DaysByDeathDate: number
  newCasesBySpecimenDate: number
  cumCasesBySpecimenDateRate: number
  cumDeaths28DaysByDeathDate: number
  cumCasesBySpecimenDate: number
  cumDeaths28DaysByDeathDateRate: number
}

type LatestData = LatestDataItem[]

export const getLatestByType = async (
  options: LatestOptions
): Promise<LatestData> => {
  let data: LatestData = await getPaginatedData(
    [`areaType=${options.areaType}`],
    {
      date: "date",
      areaName: "areaName",
      newCasesBySpecimenDate: "newCasesBySpecimenDate",
      newDeaths28DaysByDeathDate: "newDeaths28DaysByDeathDate",
      cumCasesBySpecimenDate: "cumCasesBySpecimenDate",
      cumCasesBySpecimenDateRate: "cumCasesBySpecimenDateRate",
      cumDeaths28DaysByDeathDate: "cumDeaths28DaysByDeathDate",
      cumDeaths28DaysByDeathDateRate: "cumDeaths28DaysByDeathDateRate",
    },
    "cumDeaths28DaysByDeathDateRate"
  )
  return [...data].sort(
    (a, b) => a.newCasesBySpecimenDate - b.newCasesBySpecimenDate
  )
}

export type GetLatestData = {
  utla: LatestData
  ltla: LatestData
}

export const getLatest = async (): Promise<GetLatestData> => {
  let [ltla, utla] = await Promise.all([
    getLatestByType({ areaType: "ltla" }),
    getLatestByType({ areaType: "utla" }),
  ])
  return { utla, ltla }
}
