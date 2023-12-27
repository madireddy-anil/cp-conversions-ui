import { Colors } from '@payconstruct/design-system'
import React from 'react'

interface PageWrapper {
  id: string
}

const PageWrapper: React.FC<PageWrapper> = ({ id, children }) => {
  return (
    <div
      id={id}
      style={{
        padding: '0px 100px 30px',
        margin: 0,
        height: 'calc(100vh - 56px)',
        overflowY: 'auto',
        background: Colors.grey.neutral50,
      }}
    >
      {children}
    </div>
  )
}

export { PageWrapper }
