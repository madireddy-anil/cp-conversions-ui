import React from 'react'
import { Colors, Icon, IconProps } from '@payconstruct/design-system'

import styles from './Status.module.css'

interface StatusProps {
  size?: 'small' | 'medium'
  status: string
}
const strangeNamingStatus = ['pendingApproval']
const Status: React.FC<StatusProps> = ({ status, size = 'medium' }) => {
  const getStatusIconName = () => {
    let statusName: IconProps['name'] = 'pendingColored'
    switch (status) {
      case 'approved':
      case 'complete':
      case 'completed':
        statusName = 'checkCircle'
        break
      case 'pendingApproval':
        statusName = 'attention'
        break
      case 'pending':
      case 'processing':
        statusName = 'pendingColored'
        break
      case 'rejected':
      case 'cancelled':
        statusName = 'fallColored'
        break
      case 'new':
        statusName = 'pendingColored'
        break
      default:
        break
    }
    return statusName
  }

  const getStatusName = (status: string) => {
    if (status === 'pendingApproval') return 'Pending approval'
  }

  return (
    <div style={{ display: 'inline-flex' }}>
      <Icon
        size={size === 'small' ? 'extraSmall' : 'medium'}
        name={getStatusIconName()}
        color={status === 'pendingApproval' ? Colors.blue.blue900 : undefined}
      />
      <div>
        <div className={styles['status_text-' + size]}>
          {strangeNamingStatus.includes(status)
            ? getStatusName(status)
            : status?.charAt(0).toUpperCase() + status?.slice(1)}
        </div>
      </div>
    </div>
  )
}

export { Status }
