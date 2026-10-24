export const SPEAKERS_QUERY = `*[_type == "speaker"] | order(name asc) {
  _id,
  name,
  role,
  bio
}`