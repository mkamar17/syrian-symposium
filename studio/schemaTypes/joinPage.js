
export default {
  name: 'joinPage',
  title: 'Sponsorship Page',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      initialValue: 'Become a Sponsor',
    },
    {
  name: 'intro',
  title: 'Subtitle',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [],
      lists: [],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'Hyperlink',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto'],
                  }),
              },
            ],
          },
        ],
      },
    },
  ],
},
    {
      name: 'backgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'buttonLabel',
      title: 'Button Text',
      type: 'string',
      initialValue: 'View Pitch',
    },
    {
      name: 'pitchUrl',
      title: 'Pitch Deck URL',
      type: 'url',
      description: 'Link to your sponsorship pitch PDF or presentation.',
    },
  ],
}
