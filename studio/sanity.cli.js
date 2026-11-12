import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'guloiv31',
    dataset: 'production',
  },

  deployment: {
    autoUpdates: true,
  },

  studioHost: 'syriansymposium',
})