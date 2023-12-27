import React from 'react'
import { Result } from 'antd'
import { Button } from '@payconstruct/design-system'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button type="primary" onClick={() => navigate('/')} label={'Go back to home page'} />
        </div>
      }
    />
  )
}

export { PageNotFound }
