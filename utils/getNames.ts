
import { client }  from "./sanity"

  export const getFamilies = async () => {
    const query = client.fetch(`*[_type == 'descendants']{
      name,
      slug,
      _id,
      content
    }`)
    return query
  }