import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'syrian symposium',

  projectId: 'guloiv31',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .id('footer')
              .title('Footer')
              .child(S.document().schemaType('footerSettings').documentId('footer')),
            S.divider(),
            S.documentTypeListItem('homeIntro').title('Home intro'),
            S.documentTypeListItem('eventDetails').title('Event details'),
            S.documentTypeListItem('invitation').title('Invitation'),
            S.documentTypeListItem('discussionSection').title('Discussion section'),
            S.documentTypeListItem('highlightCard').title('Highlight cards'),
            S.documentTypeListItem('session').title('Schedule items'),
            S.documentTypeListItem('speaker').title('Speakers'),
            S.documentTypeListItem('university').title('Universities'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})