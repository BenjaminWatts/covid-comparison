import { getLatest, getLatestByType, LatestDataItem } from "../getLatest"

jest.setTimeout(1000 * 60)

const dataItemCheck = (first: LatestDataItem) => {
  expect(typeof first.date).toBe("string")
  expect(typeof first.areaName).toBe("string")
  expect(typeof first.newDeaths28DaysByDeathDate).toBe("number")
  expect(typeof first.newCasesBySpecimenDate).toBe("number")
  expect(typeof first.cumCasesBySpecimenDateRate).toBe("number")
  expect(typeof first.cumDeaths28DaysByDeathDate).toBe("number")
  expect(typeof first.cumDeaths28DaysByDeathDateRate).toBe("number")
}

test("getLatestByType", async () => {
  const result = await getLatestByType({ areaType: "utla" })
  const first = result[0]
  dataItemCheck(first)
})

test("getLatest", async () => {
  const { ltla, utla } = await getLatest()
  dataItemCheck(ltla[0])
  dataItemCheck(utla[0])
})
