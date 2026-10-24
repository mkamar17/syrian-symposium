export default {
  name: 'homeIntro',
  title: 'Home intro',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'The large text on the left',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      description: 'Each item becomes one paragraph on the right',
    },
  ],
}