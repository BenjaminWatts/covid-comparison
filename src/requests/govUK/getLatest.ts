import { getPaginatedData } from "./getPaginatedData"

type AreaType = "ltla" | "utla"

type LatestOptions = {
  areaType: AreaType
}

export type LatestDataItem = {
  date: string
  areaName: string
  newDeaths28DaysByDeathDate: string
  newCasesBySpecimenDate: string
  cumCasesBySpecimenDateRate: string
  cumDeaths28DaysByDeathDate: string
  cumCasesBySpecimenDate: string
  cumDeaths28DaysByDeathDateRate: string
}

type LatestData = LatestDataItem[]

export const getLatestByType = (options: LatestOptions): Promise<LatestData> =>
  getPaginatedData(
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
