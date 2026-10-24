export default {
  name: 'highlightCard',
  title: 'Highlight card',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'text', title: 'Short text', type: 'text', rows: 3 },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'link', title: 'Link (optional)', type: 'url' },
    { name: 'order', title: 'Order', type: 'number', description: 'Lower numbers appear first' },
  ],
}