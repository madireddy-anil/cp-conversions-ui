import React, { useContext } from 'react'
import { Button, Row, Col, Badge, Text } from '@payconstruct/design-system'
import { Permissions } from '@payconstruct/fe-utils/dist/Enum/userManagementEnums'
import PaymentsFilters from '../Filters/Filters'
import { Search } from '../Search/Search'
import { useNavigate } from 'react-router-dom'
import { PaymentFilterForm } from 'pages/Conversions/Conversions.interface'
import { ConversionsContext } from 'context/Provider'
import { SetSearchText, ToggleFilters } from 'context/Actions'
import { Hooks } from '@payconstruct/fe-utils'
import { useFlags } from 'launchdarkly-react-client-sdk'

import Styles from './Header.module.css'
import { featureFlag } from 'config/variables'

const { useCheckPermissions } = Hooks

interface HeaderProps {
  loading: boolean
  onResetSearchCallback: () => void
  onResetFiltersCallback: () => void
  setIsFormFieldCleared: (val: boolean) => void
  paymentsFilterProps?: PaymentFilterForm
  onSubmitPaymentFilters: (values: PaymentFilterForm) => void
}

const Header: React.FC<HeaderProps> = ({
  loading,
  paymentsFilterProps,
  onResetSearchCallback,
  onResetFiltersCallback,
  setIsFormFieldCleared,
  onSubmitPaymentFilters,
}) => {
  const {
    state: { showFilters, conversionSearchText, conversionsFilters, hasConversionsFiltersActive },
    dispatch,
  } = useContext(ConversionsContext)
  const navigate = useNavigate()
  const LDFlags = useFlags()
  const { hasPermission } = useCheckPermissions()

  return (
    <div className={Styles['pms_search']}>
      <div className={Styles['conversions-dashboard-title']}>
        <Text size="xlarge" weight="bold">
          Conversions
        </Text>
      </div>
      <Row>
        <Col flex="1 1 200px">
          <Search
            selectedTab={''}
            beneSearchText={''}
            paymentsSearchText={conversionSearchText}
            conversionsFilters={conversionsFilters}
            isFiltersActive={hasConversionsFiltersActive}
            onClearCallback={() => {
              onResetSearchCallback()
              dispatch(SetSearchText(''))
            }}
          />
        </Col>
        <Col className={Styles['pay_searchFilters-btn']}>
          {hasPermission(Permissions.paymentsWrite) && LDFlags[featureFlag.showConversionsUI] && (
            <Button
              style={{ marginLeft: '30px' }}
              type="primary"
              label={'Convert'}
              onClick={() => {
                navigate('/new-conversion')
              }}
            />
          )}

          <Badge dot={hasConversionsFiltersActive}>
            <Button
              style={{ marginLeft: '20px' }}
              type="tertiary"
              label="Filters"
              icon={{
                name: 'filter',
              }}
              onClick={() => dispatch(ToggleFilters(true))}
            />
          </Badge>
        </Col>
      </Row>
      <PaymentsFilters
        loading={loading}
        formProps={paymentsFilterProps}
        showPaymentsFilters={showFilters}
        onSubmitPaymentFilters={onSubmitPaymentFilters}
        onResetFiltersCallback={onResetFiltersCallback}
        setIsFormFieldCleared={setIsFormFieldCleared}
        onClose={() => {
          dispatch(ToggleFilters(false))
        }}
      />
    </div>
  )
}

export { Header }
