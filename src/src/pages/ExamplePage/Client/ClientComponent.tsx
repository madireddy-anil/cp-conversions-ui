import React, { useContext } from 'react'
import { Button } from '@payconstruct/design-system'
import { logoutUrl } from 'config/variables'
import { AuthContext } from '@payconstruct/orbital-auth-provider'

const ClientComponent: React.FC = () => {
  const { logout } = useContext(AuthContext)

  return (
    <div style={{ marginTop: '10px', padding: '0px 20px' }}>
      <h1>Client</h1>
      <p>
        After requesting we can see that the request was sent with a token correctly without using redux to store it.
      </p>
      <Button label="Logout Me" type="primary" onClick={() => logout({ returnTo: logoutUrl })} />
    </div>
  )
}

export { ClientComponent }
