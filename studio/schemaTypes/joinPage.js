export default {
  name: 'joinPage',
  title: 'Join page',
  type: 'document',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Join us' },
    { name: 'intro', title: 'Intro', type: 'text', rows: 3 },
    {
      name: 'steps',
      title: 'How to join',
      type: 'array',
      description: 'One item per step, in order',
      of: [{ type: 'string' }],
    },
    { name: 'contactEmail', title: 'Contact email', type: 'string' },
    { name: 'instagramUrl', title: 'Instagram URL', type: 'url' },
    { name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' },
  ],
}