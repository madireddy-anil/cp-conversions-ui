import { Alert } from '@payconstruct/design-system'
import React from 'react'

const Message: React.FC = () => {
  return (
    <Alert
      message="This is an indicative rate and is subject to change"
      description={
        <span>
          Due to this reason, the sell amount instructed above will be fixed,{' '}
          <b>but what you buy may differ to what is displayed on this screen upon execution</b>{' '}
        </span>
      }
      type="info"
    />
  )
}

export default Message
