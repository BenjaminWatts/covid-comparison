import React from "react"
import { GetLatestData } from "../../requests/govUK"
import {
  Table,
  Typography,
  Space,
  Layout,
  Tooltip,
  Button as AButton,
  Card,
  Divider,
  ButtonProps,
} from "antd"
import { LatestDataItem } from "../../requests/govUK/getLatest"

const Button = (props: ButtonProps) => <AButton size="small" {...props} />

enum AreaType {
  ltla = "Lower Tier Council (LTLA)",
  utla = "Upper Tier Council (LTLA)",
}

type LatestTableProps = {
  data: GetLatestData
}

const selectData = (areaType: AreaType, data: GetLatestData) => {
  switch (areaType) {
    case AreaType.ltla:
      return data.ltla
    case AreaType.utla:
      return data.utla
    default:
      throw Error(`unknown data type ${areaType}`)
  }
}

enum Duration {
  current = "current",
  cumulative = "cumulative",
}

enum Measure {
  absolute = "absolute number",
  perCapita = "per 100,000",
}

const selectColumns = (duration: Duration, measure?: Measure) => {
  switch (duration) {
    case Duration.current:
      return [
        {
          title: "New Cases",
          dataIndex: "newCasesBySpecimenDate",
          sorter,
          render: (_checked, record: LatestDataItem, index) => (
            <Tooltip title={readDate(record.date)}>
              {record.newCasesBySpecimenDate}
            </Tooltip>
          ),
        },
        {
          title: "Deaths",
          dataIndex: "newDeaths28DaysByDeathDate",
          sorter,
          render: (_checked, record: LatestDataItem, index) => (
            <Tooltip title={readDate(record.date)}>
              {record.newDeaths28DaysByDeathDate}
            </Tooltip>
          ),
        },
      ]
    case Duration.cumulative:
      switch (measure) {
        case Measure.perCapita:
          return [
            {
              title: "Cumulative Cases per 100,000",
              dataIndex: "cumCasesBySpecimenDateRate",
              sorter,
            },
            {
              title: "Cumulative Deaths per 100,000",
              dataIndex: "cumDeaths28DaysByDeathDateRate",
              sorter,
            },
          ]
        default:
          return [
            {
              title: "Cumulative Cases",
              dataIndex: "cumCasesBySpecimenDate",
              sorter,
            },
            {
              title: "Cumulative Deaths",
              dataIndex: "cumDeaths28DaysByDeathDate",
              sorter,
            },
          ]
      }
  }
}

const sorter = (a: number, b: number) => a - b

type SortedInfo = {
  field: string
  order: "ascend" | "descend"
}

const areaColumn = {
  title: "Area",
  dataIndex: "areaName",
}

const readDate = (dateString: string) =>
  new Date(Date.parse(dateString)).toLocaleDateString()

export const LatestTable = (props: LatestTableProps) => {
  const [areaType, setAreaType] = React.useState(AreaType.ltla)
  const [measure, setMeasure] = React.useState(Measure.absolute)
  const [duration, setDuration] = React.useState(Duration.current)
  const data = selectData(areaType, props.data)

  const [tableState, setTableState] = React.useState({
    filteredInfo: null,
    sortedInfo: {
      field: "cumDeaths28DaysByDeathDateRate",
      order: "descend",
    },
  })

  const columns = [areaColumn, ...selectColumns(duration, measure)]

  // console.log(tableState)

  function onChange(pagination, filters, sorter, extra) {
    setTableState({
      filteredInfo: filters,
      sortedInfo: sorter,
    })
    // console.log("params", pagination, filters, sorter, extra)
  }

  const dataSource = () => {
    if (!tableState.sortedInfo) {
      return data
    }
    const sortedInfo: SortedInfo = tableState.sortedInfo
    return data.sort((aItem: LatestDataItem, bItem: LatestDataItem) => {
      const { field, order } = sortedInfo
      const a = aItem[field]
      const b = bItem[field]
      switch (field) {
        default:
          const isAscend = order === "ascend"
          return isAscend ? a - b : b - a
      }
    })
  }

  return (
    <Space direction="vertical" style={{ width: "100%", padding: 10 }}>
      <Card style={{ maxWidth: 500 }}>
        <Typography.Title level={5}>Data options</Typography.Title>
        {duration === Duration.current ? (
          <Button onClick={() => setDuration(Duration.cumulative)}>
            Cumulative data
          </Button>
        ) : (
          <Space>
            <Button
              onClick={() => {
                setMeasure(Measure.absolute)
                setDuration(Duration.current)
              }}
            >
              Current Data
            </Button>

            {measure !== Measure.perCapita ? (
              <Button
                onClick={() => {
                  setMeasure(Measure.perCapita)
                }}
              >
                Rate per 100,000
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setMeasure(Measure.absolute)
                }}
              >
                Absolute cases/deaths
              </Button>
            )}
          </Space>
        )}
      </Card>

      <Table
        size="small"
        style={{ maxWidth: 500 }}
        dataSource={dataSource()}
        columns={columns}
        onChange={onChange}
      />

      <Typography.Paragraph>
        {`Latest Data at ${readDate(data[0].date)} from Gov.uk`}
      </Typography.Paragraph>
    </Space>
  )
}
