
export default {
  name: 'pastEvent',
  title: 'Past Events',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      description: 'Displayed inside the image at the bottom-left.',
      validation: (Rule) => Rule.required(),
    },
    {
  name: 'description',
  title: 'Event Description',
  type: 'text',
  rows: 3,
  description: 'Displayed underneath the event title in the slideshow.',
},
    {
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Image Description',
          type: 'string',
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the slideshow.',
      initialValue: 0,
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'order',
    },
    prepare({ title, media, subtitle }) {
      return {
        title,
        media,
        subtitle: `Display order: ${subtitle ?? 0}`,
      }
    },
  },
}
