import { Text, Spacer } from '@payconstruct/design-system'
import React from 'react'

const Title: React.FC = () => {
  return (
    <>
      <h1>Conversion</h1>
      <Spacer size={25} />
      <Text size="small">Select the currencies and amount you want to convert.</Text>
      <Spacer size={35} />
    </>
  )
}

export default Title
