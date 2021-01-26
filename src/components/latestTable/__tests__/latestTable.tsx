import { LatestTable } from "../latestTable"
import { render } from "@testing-library/react"
import React from "react"
import { getLatest } from "../../../requests/govUK"

test("empty", async () => {
  const mockData = {
    utla: [],
    ltla: [],
  }
  const res = await render(<LatestTable data={mockData} />)
  res.debug()
})

test("withData", async () => {
  const mockData = await getLatest()
  const res = await render(<LatestTable data={mockData} />)
  res.debug()
})
