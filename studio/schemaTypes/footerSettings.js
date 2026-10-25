export default {
  name: 'footerSettings',
  title: 'Footer',
  type: 'document',
  fields: [
    { name: 'organisation', title: 'Organisation name', type: 'string' },
    { name: 'address', title: 'Address', type: 'text', rows: 2 },
    { name: 'contactEmail', title: 'Contact email', type: 'string' },
    { name: 'linkedinUrl', title: 'LinkedIn page URL', type: 'url' },
  ],
}