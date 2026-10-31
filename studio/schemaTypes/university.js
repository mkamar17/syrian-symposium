export default {
  name: 'university',
  title: 'University',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'University name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'A PNG with a transparent background works best',
      options: { hotspot: true },
    },
    {
      name: 'url',
      title: 'Website (optional)',
      type: 'url',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
  ],
}