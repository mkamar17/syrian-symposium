export const SPEAKERS_QUERY = `*[_type == "speaker"] | order(name asc) {
  _id,
  name,
  role,
  bio
}`

export const HOME_INTRO_QUERY = `*[_type == "homeIntro"][0] {
  heading,
  paragraphs
}`

export const HIGHLIGHT_CARDS_QUERY = `*[_type == "highlightCard"] | order(order asc) {
  _id,
  title,
  text,
  image,
  link
}`
export const HISTORY_QUERY = `*[_type == "societyHistory"][0] {
  heading,
  paragraphs,
  heroImage,
  milestones[] | order(year asc) {
    _key,
    year,
    title,
    description
  }
}`
