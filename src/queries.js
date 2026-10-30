export const SPEAKERS_QUERY = `*[_type == "speaker" && confirmed == true] | order(order asc, name asc) {
  _id,
  name,
  role,
  bio,
  photo
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
  heroImages,
  milestones[] | order(year asc) {
    _key,
    year,
    title,
    description
  }
}`

export const INVITATION_QUERY = `*[_type == "invitation"] | order(order asc) {
  _id,
  heading,
  text,
  images,
  buttonLabel,
  buttonLink
}`

export const DISCUSSION_SECTION_QUERY = `*[_type == "discussionSection"][0] {
  heading,
  points[] {
    _key,
    title,
    text,
    icon
  }
}`

export const FOOTER_QUERY = `*[_type == "footerSettings"][0] {
  organisation,
  address,
  contactEmail,
  linkedinUrl
}`

export const EVENT_DETAILS_QUERY = `*[_type == "eventDetails"][0] {
  host,
  dates,
  venue
}`

export const SCHEDULE_QUERY = `*[_type == "session"] | order(date asc, order asc) {
  _id,
  title,
  date,
  time,
  venue,
  speakers[]->{ name, role }
}`

export const JOIN_PAGE_QUERY = `*[_type == "joinPage"][0] {
  heading,
  intro,
  steps,
  contactEmail,
  instagramUrl,
  linkedinUrl
}`