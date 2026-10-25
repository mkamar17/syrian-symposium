export default {
  name: 'discussionSection',
  title: 'Discussion section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Section heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'points',
      title: 'Discussion points',
      type: 'array',
      description: 'Drag to reorder. Three points look best.',
      validation: (Rule) => Rule.max(3).warning('Three points fit the layout best'),
      of: [
        {
          type: 'object',
          name: 'discussionPoint',
          fields: [
            { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'text', title: 'Text', type: 'text', rows: 3 },
            {
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'A simple line icon, ideally with a transparent background',
            },
          ],
          preview: {
            select: { title: 'title', media: 'icon' },
          },
        },
      ],
    },
  ],
}