export default {
  name: 'invitation',
  title: 'Invitation',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Headline',
      type: 'array',
      description: 'Select words and click B to make them bold',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [{ title: 'Bold', value: 'strong' }],
            annotations: [],
          },
        },
      ],
    },
    {
      name: 'text',
      title: 'Supporting text',
      type: 'text',
      rows: 3,
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'The first photo sits at the back, the last sits on top. Three works best.',
      validation: (Rule) => Rule.max(4).warning('Four images or fewer works best'),
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Description for screen readers',
              type: 'string',
            },
          ],
        },
      ],
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
      description: 'For a section on this page, use #schedule. For another page, use /schedule.',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
  ],
}