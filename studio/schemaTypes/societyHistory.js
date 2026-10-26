export default {
  name: 'societyHistory',
  title: 'Society History',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Our History',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'paragraphs',
      title: 'Introduction Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
  name: 'heroImages',
  title: 'Banner Slideshow Images',
  type: 'array',
  of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'milestones',
      title: 'History Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'year',
              title: 'Year',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Event Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'year',
            },
          },
        },
      ],
    },
  ],
}
