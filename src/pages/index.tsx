import React from "react"
import SEO from "../components/seo"
import { LatestTable } from "../components/latestTable/latestTable"
import { getLatest, GetLatestData } from "../requests/govUK"
import { Spin, Button, Layout, Typography, Card, Divider } from "antd"
import { ErrorBoundary } from "react-error-boundary"

const { Header, Content, Footer } = Layout

const ComparisonPage = () => {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<null | GetLatestData>(null)
  const [error, setError] = React.useState(false)

  const getData = async () => {
    setLoading(true)
    setError(false)
    try {
      setData(await getLatest())
    } catch (e) {
      console.warn(e)
      setError(true)
    }
    setLoading(false)
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
        {loading === true && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Spin size="large" />
            <Divider/>
            <Typography.Paragraph>
              Covid Comparison provides a comparison of covid rates between UK local authorities. You can compare covid rates now, and for the duration of the pandemic, including on a per capita basis and across both lower tier and upper tier local authorities. Data is updated daily from Gov.uk.
            </Typography.Paragraph>
          </div>
        )}
        {data && <LatestTable data={data} />}
        {error ?? <Button onClick={getData}>Retry</Button>}
      </Content>
      <SEO title="UK Covid Dashboard" />
      <Footer>
        © {new Date().getFullYear()}, Built by
        {` `}
        <a href="https://kilowatts.io">kilowatts.io</a>
        {`  `}
        <a href="https://github.com/BenjaminWatts/covid-comparison/">Github</a>
      </Footer>
    </Layout>
  )
}

type ErrorFallbackProps = {
  error: Error
  resetErrorBoundary: () => void
}

const ErrorFallback = (props: ErrorFallbackProps) => {
  return (
    <Card title="Error">
      {props.error.message}
      <Button onClick={props.resetErrorBoundary}>Reload</Button>
    </Card>
  )
}

const IndexPage = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ComparisonPage />
    </ErrorBoundary>
  )
}

export default IndexPage
