import { Notification } from '@payconstruct/design-system'

export const onFailNewAccountCreation = () =>
  Notification({
    type: 'error',
    message: `There was an error in creating the account`,
    description: 'We apologies for the inconvenience. Please get in touch with your customer service representative.',
  })
