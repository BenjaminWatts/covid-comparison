const axios = require("axios")
/**
 * Extracts paginated data by requesting all of the pages
 * and combining the results.
 *
 * @param filters { Array<string> }
 *          API filters. See the API documentations for additional
 *          information.
 *
 * @param structure { Object<string, any> }
 *          Structure parameter. See the API documentations for
 *          additional information.
 *
 * @returns {Promise<Array<any>>}
 *          Comprehensive list of dictionaries containing all the data for
 *          the given ``filters`` and ``structure``.
 */

type Filters = Array<string>
type Structure = Object

type DataOutput = any

export const getPaginatedData = async (
  filters: Filters,
  structure: Structure,
  latestBy?: string
): Promise<DataOutput> => {
  const endpoint = "https://api.coronavirus.data.gov.uk/v1/data",
    apiParams = {
      filters: filters.join(";"),
      structure: JSON.stringify(structure),
      latestBy: latestBy ? latestBy : undefined,
    },
    result = []

  let nextPage = null,
    currentPage = 1

  do {
    let params = {
      ...apiParams,
      page: currentPage,
    }

    const { data, status, statusText } = await axios.get(endpoint, {
      params,
      timeout: 10000,
    })

    if (status >= 400) {
      throw Error(statusText)
    }

    if (data.pagination.next in data && data.pagination.next !== null)
      nextPage = data.pagination.next || null

    result.push(...data.data)

    currentPage++
  } while (nextPage)

  return result
}
