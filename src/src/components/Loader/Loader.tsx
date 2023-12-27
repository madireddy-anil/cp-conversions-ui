import React from 'react'
import { Spin } from '@payconstruct/design-system'

interface LoaderProps {
  loading: boolean
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <div style={{ padding: '10px' }}>
      <Spin loading={loading}>
        <div></div>
      </Spin>
    </div>
  )
}

export { Loader }
