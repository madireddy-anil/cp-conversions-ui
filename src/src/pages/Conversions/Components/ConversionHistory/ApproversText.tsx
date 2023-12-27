import React from 'react'
import { Colors } from '@payconstruct/design-system'

// import Styles from "./Search.module.css";

interface ApproversTextProps {
  status?: string
}

const ApproversText: React.FC<ApproversTextProps> = ({ status }) => {
  if (!status) return <></>
  return (
    <span style={{ fontSize: '10px', color: Colors.grey.neutral500 }}>
      <b>1</b> of <b>2</b> approvers have approved this payment
    </span>
  )
}

export { ApproversText }
