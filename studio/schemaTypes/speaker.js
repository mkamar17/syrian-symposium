export default {
  name: 'speaker',
  title: 'Speaker',
  type: 'document',
  fields: [
    {
      name: 'confirmed',
      title: 'Confirmed',
      type: 'boolean',
      initialValue: false,
      description: 'Only confirmed speakers appear on the website',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. Chief Executive, Example Bank',
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'A square headshot works best',
    },
    {
      name: 'bio',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
  ],
}