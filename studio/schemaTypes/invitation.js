export default {
  name: 'invitation',
  title: 'Invitation',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'text',
      title: 'Supporting text',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'buttonLabel',
      title: 'Button label',
      type: 'string',
    },
    {
      name: 'buttonLink',
      title: 'Button link',
      type: 'string',
      description: 'For a section on this page, use #schedule. For another page, use /history.',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
  ],
}