import React from 'react'
import { Spin } from '@payconstruct/design-system'
import styles from './FullScreenLoading.module.css'

const FullScreenLoading: React.FC = () => {
  return (
    <>
      <div className={styles['FullScreenLoading__loading']}>
        <Spin />
      </div>
      <div className={styles['FullScreenLoading']}></div>
    </>
  )
}

export { FullScreenLoading }
