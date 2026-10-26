export default {
  name: 'eventDetails',
  title: 'Event details',
  type: 'document',
  fields: [
    {
      name: 'host',
      title: 'Hosted by',
      type: 'string',
      description: 'e.g. The Syrian Society',
    },
    {
      name: 'dates',
      title: 'Dates',
      type: 'string',
      description: 'e.g. 21 - 22 March 2026',
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'string',
      description: 'e.g. Main Hall, Example Building',
    },
  ],
}