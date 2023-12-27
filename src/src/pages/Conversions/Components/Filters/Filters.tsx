import React, { useContext, useEffect, useState } from 'react'
import { Text, Drawer, Form, Select, Button, DatePicker } from '@payconstruct/design-system'
import moment from 'moment-timezone'
import { TabNameEnum } from 'pages/Conversions/enums'
import { PaymentFilterForm } from 'pages/Conversions/Conversions.interface'
import { paymentFilterFormValidation } from 'helpers/customHelpers/customHelper'
import { ConversionsContext } from 'context/Provider'
import { SetConversionsFilters, ToggleFilters } from 'context/Actions'
import Styles from './Filters.module.css'
import { useQuery } from '@apollo/client'
import { getPaymentsCurrencies } from 'state/contextProviders/apollo/queries/payments'

interface IDrawerProps {
  showPaymentsFilters: boolean
  formProps?: PaymentFilterForm
  loading: boolean
  onClose: () => void
  setIsFormFieldCleared: (val: boolean) => void
  onResetFiltersCallback: () => void
  onSubmitPaymentFilters: (values: PaymentFilterForm) => void
}

export const PaymentsInitialFormValues = {
  dateFrom: undefined,
  dateTo: undefined,
  fromToDate: undefined,
  currencies: undefined,
  debitCurrencies: undefined,
  type: undefined,
  status: undefined,
  conversion: true,
}

const PaymentsFilters: React.FC<IDrawerProps> = ({
  showPaymentsFilters = false,
  loading,
  onClose,
  onSubmitPaymentFilters,
  onResetFiltersCallback,
  setIsFormFieldCleared,
}) => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
  const {
    dispatch,
    state: { hasConversionsFiltersActive, conversionsFilters, showFilters },
  } = useContext(ConversionsContext)
  const [isButtonDisabled, setBtnDisabled] = useState<boolean>(true)

  const { data: currencies } = useQuery(getPaymentsCurrencies, {
    fetchPolicy: 'cache-first',
    skip: !showFilters,
  })

  const isBtnDisabled = hasConversionsFiltersActive ? false : true

  useEffect(() => {
    setBtnDisabled(isBtnDisabled)
  }, [isBtnDisabled])

  useEffect(() => {
    form.setFieldsValue({ ...conversionsFilters })
  }, [])

  const handleClearFilters = () => {
    onResetFiltersCallback()
    setBtnDisabled(true)
    form.resetFields()
    form.setFieldsValue({ ...PaymentsInitialFormValues })
    dispatch(
      SetConversionsFilters({
        ...PaymentsInitialFormValues,
        limit: 50,
      })
    )
    dispatch(ToggleFilters(false))
  }

  const sellCurrencyOptions: { label: string; value: string }[] = Array.from(
    new Set((currencies?.GetPayments || []).map(currency => currency && currency.debitCurrency))
  )
    .map(currency => {
      return {
        label: currency ?? '',
        value: currency ?? '',
      }
    })
    .filter(currency => currency.label && currency.value)
    .sort((a, b) => a?.label?.localeCompare(b?.label))

  const buyCurrencyOptions: { label: string; value: string }[] = Array.from(
    new Set((currencies?.GetPayments || []).map(currency => currency && currency.creditCurrency))
  )
    .map(currency => {
      return {
        label: currency ?? '',
        value: currency ?? '',
      }
    })
    .filter(currency => currency.label && currency.value)
    .sort((a, b) => a?.label?.localeCompare(b?.label))

  // const handleOnClose = () => {
  //   onClose();
  // };

  const onFormFieldClearHandler = (field: string, value: null | undefined) => {
    const validatedFormValues = paymentFilterFormValidation({
      ...conversionsFilters,
      [field]: value,
    })
    Promise.all([dispatch(SetConversionsFilters(validatedFormValues, undefined)), setIsFormFieldCleared(true)]).then(
      () => setBtnDisabled(true)
    )
  }

  const getDrawerContent = () => {
    return (
      <Form
        key={TabNameEnum.Payments}
        form={form}
        initialValues={conversionsFilters}
        onFieldsChange={(_, allFields) => {
          allFields.length && setBtnDisabled(false)
        }}
        onFinish={(formData: PaymentFilterForm) => onSubmitPaymentFilters(formData)}
      >
        <div className="filter--fields">
          <Form.Item name="fromToDate">
            <RangePicker
              allowClear
              label="Date Range"
              style={{ width: '100%' }}
              placeholder={['From Date', 'To Date']}
              onChange={values => {
                // onClear function
                if (values === null) {
                  onFormFieldClearHandler('fromToDate', null)
                }
              }}
              disabledDate={current => current > moment()}
              panelView="single-month-view"
            />
          </Form.Item>
          <Form.Item name="debitCurrencies">
            <Select
              allowClear
              label="Sell Currency"
              mode="multiple"
              options={sellCurrencyOptions}
              placeholder="Select Sell Currency"
              optionFilterProp="label"
              onClear={() => onFormFieldClearHandler('debitCurrencies', undefined)}
            />
          </Form.Item>
          <Form.Item name="currencies">
            <Select
              allowClear
              label="Buy Currency"
              mode="multiple"
              options={buyCurrencyOptions}
              placeholder="Select Buy Currency"
              optionFilterProp="label"
              onClear={() => onFormFieldClearHandler('currencies', undefined)}
            />
          </Form.Item>
          <Form.Item name="status">
            <Select
              allowClear
              label="Status"
              optionlist={[
                ['pending', 'Pending'],
                // ["pendingApproval", "Pending Approval"],
                ['completed', 'Completed'],
                ['cancelled', 'Cancelled'],
              ]}
              placeholder="Select Status"
              optionFilterProp="children"
              onClear={() => onFormFieldClearHandler('status', undefined)}
            />
          </Form.Item>
        </div>
        <div className={Styles['advanceFilter__footer']}>
          <Button
            label="Cancel"
            type="secondary"
            onClick={() => dispatch(ToggleFilters(false))}
            style={{ marginRight: '14px' }}
          />
          <Button
            formType="submit"
            label="Apply"
            type="primary"
            disabled={isButtonDisabled}
            loading={loading}
            onClick={() => form.submit()}
          />
        </div>
      </Form>
    )
  }

  return (
    <Drawer
      visible={showPaymentsFilters}
      onClose={onClose}
      closable={false}
      width={400}
      title={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Text weight="bold" size="large">
            Filter
          </Text>
          <Button
            label={'Clear all'}
            size="large"
            type="link"
            disabled={!hasConversionsFiltersActive}
            onClick={handleClearFilters}
          />
        </div>
      }
    >
      {getDrawerContent()}
    </Drawer>
  )
}

export default PaymentsFilters
