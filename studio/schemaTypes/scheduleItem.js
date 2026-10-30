export default {
  name: 'session',
  title: 'Schedule Item',
  type: 'document',
  fields: [
    { name: 'title', title: 'Session title', type: 'string' },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'time', title: 'Time', type: 'string', description: 'e.g. 11:00 am - 12:00 pm' },
    { name: 'venue', title: 'Venue', type: 'string' },
    {
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'speaker' }] }],
    },
    { name: 'order', title: 'Order', type: 'number', description: 'Lower numbers appear first within the same day' },
  ],
}