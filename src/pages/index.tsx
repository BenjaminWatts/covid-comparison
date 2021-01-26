import React from "react"
import { PageProps, graphql } from "gatsby"
import SEO from "../components/seo"
import { LatestTable } from "../components/latestTable/latestTable"
import { getLatest, GetLatestData } from "../requests/govUK"
import { Spin, Button, Layout, Typography } from "antd"

type DataProps = {
  site: {
    buildTime: string
  }
}

const { Header, Content, Footer } = Layout

const IndexPage: React.FC<PageProps<DataProps>> = () => {
  const [data, setData] = React.useState<null | GetLatestData>(null)
  const [error, setError] = React.useState(false)

  const getData = async () => {
    setError(false)
    try {
      setData(await getLatest())
    } catch (e) {
      setError(true)
    }
  }

  React.useEffect(() => {
    getData()
  }, [])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Typography.Title level={3} style={{ color: "white", paddingTop: 15 }}>
          Covid Comparison
        </Typography.Title>
      </Header>
      <Content style={{ height: "100%" }}>
        {!data ? <Spin size="large" /> : <LatestTable data={data} />}
        {error ?? <Button onClick={getData}>Retry</Button>}
      </Content>
      <SEO title="UK Covid Dashboard" />
      <Footer>
        © {new Date().getFullYear()}, Built by
        {` `}
        <a href="https://kilowatts.io">kilowatts.io</a>
      </Footer>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`
