import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, PageWrapper, TableWrapper, Spin, Icon, Notification } from '@payconstruct/design-system'
import copy from 'copy-to-clipboard'
import { PaymentsInitialFormValues } from '../Filters/Filters'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Header as HeaderWrapper } from '../Header/Header'
import { Loader } from '../../../../components/Loader/Loader'
import { Status } from '../Status/Status'
import { environment } from 'config/variables'
import { Payment } from '__generated__/graphql'
import { Currency } from '@payconstruct/fe-utils/dist/Hooks/useCurrencies'
import { Helpers } from '@payconstruct/fe-utils'
import { PaymentFilterForm } from 'pages/Conversions/Conversions.interface'
import { ConversionsContext } from 'context/Provider'
import { SetConversionsFilters, ToggleFilters } from 'context/Actions'
import { useQuery } from '@apollo/client'
import { getPayments, paymentsFullTextSearch } from 'state/contextProviders/apollo/queries/payments'

import Styles from '../Style.module.css'
import { currencyFormatter, paymentFilterFormValidation } from 'helpers/customHelpers/customHelper'

const { truncateAccountNumber, fractionFormat } = Helpers

type ConversionsProps = {
  currencies: Currency[]
}
const Conversions: React.FC<ConversionsProps> = ({ currencies }) => {
  const navigate = useNavigate()
  const {
    dispatch,
    state: { hasConversionsFiltersActive, conversionsNextToken, conversionSearchText, conversionsFilters },
  } = useContext(ConversionsContext)

  const [hasScrollActive, setHasScrollActive] = useState<boolean>(false)
  const [allPayments, setAllPayments] = useState<Payment[]>([])
  const [lastPagePayments, setLastPagePayments] = useState<Payment[]>([])

  const defaultTableHeight = '70vh'
  const [tableHeight, setTableHeight] = useState(defaultTableHeight)

  const [isFormFieldCleared, setIsFormFieldCleared] = useState(false)

  const nextToken = hasConversionsFiltersActive ? undefined : conversionsNextToken

  const { loading: allPaymentsLoading } = useQuery(getPayments, {
    variables: {
      nextToken: nextToken,
      ...conversionsFilters,
    },
    onCompleted: (paymentsResponse: { GetPayments: Payment[] }) => {
      const allPayments = paymentsResponse.GetPayments
      setStatePaymentsFun(allPayments)
      setLastPagePayments(allPayments)
      const tableHeight = document?.getElementById('paymentsScrollDev')?.clientHeight ?? 0
      setTableHeight(
        tableHeight > 660 ? defaultTableHeight : `${document?.getElementById('paymentsScrollDev')?.clientHeight}px`
      )
    },
    skip: !!conversionSearchText,
    fetchPolicy: 'no-cache',
  })

  const { loading: paymentsSearchLoading } = useQuery(paymentsFullTextSearch, {
    variables: {
      text: conversionSearchText,
      ...conversionsFilters,
    },
    onCompleted: (paymentsResponse: { PaymentsFullTextSearch: Payment[] }) => {
      const allPayments = paymentsResponse.PaymentsFullTextSearch
      setStatePaymentsFun(allPayments)
      setLastPagePayments(allPayments)
      const tableHeight = document?.getElementById('paymentsScrollDev')?.clientHeight ?? 0
      setTableHeight(
        tableHeight > 660 ? defaultTableHeight : `${document?.getElementById('paymentsScrollDev')?.clientHeight}px`
      )
    },
    skip: !conversionSearchText,
    fetchPolicy: 'no-cache',
  })

  const setStatePaymentsFun = (payments: Payment[]) => {
    const paymentsTableData: Payment[] = []
    conversionSearchText || hasConversionsFiltersActive || isFormFieldCleared
      ? setAllPayments(payments)
      : setAllPayments(prev => [...prev, ...payments])
    return paymentsTableData
  }

  const onSubmit = (formProps: PaymentFilterForm) => {
    // onSubmit payments filters form
    const props = paymentFilterFormValidation(formProps)
    fetchPayments({ ...props, limit: 25 }, true)
  }

  const fetchPayments = (data: PaymentFilterForm, applyFilters?: boolean) => {
    Promise.all([
      setAllPayments([]),
      dispatch(SetConversionsFilters({ ...data, limit: data.limit, conversion: true }, undefined)),
    ]).then(() => {
      setHasScrollActive(false)
      applyFilters && dispatch(ToggleFilters(false))
    })
  }

  const getPaymentsOnScroll = () => {
    const lastRecord = allPayments.slice(-1)
    const nextToken = lastRecord[0]?._id ?? undefined
    dispatch(
      SetConversionsFilters(
        {
          ...conversionsFilters,
          limit: conversionsFilters.limit + 25,
        },
        nextToken
      )
    )
  }

  const resetFilters = (filterType: string) => {
    if (filterType === 'ResetSearch') {
      setAllPayments([])
      dispatch(SetConversionsFilters({ ...conversionsFilters }, undefined))
    } else {
      fetchPayments({
        ...PaymentsInitialFormValues,
        limit: 50,
      })
    }
  }

  const infiniteScrollHandler = () => {
    setHasScrollActive(true)
    getPaymentsOnScroll()
  }

  const onHandleClickPayment = (id: string) => {
    dispatch(SetConversionsFilters({ ...conversionsFilters }, undefined))
    navigate(`/conversions/summary/${id}`)
  }

  const columns = [
    {
      title: 'Sell currency',
      key: 'debitCurrency',
      dataIndex: 'debitCurrency',
      width: '16.6%',
      fixed: 'left',
      ellipsis: true,
      render: (_: void, record: Payment) => {
        return renderColumn(
          record?._id,
          currencyFormatter(currencies, record?.debitCurrency ?? '', record?.mainDebitCurrency ?? '')
        )
      },
    },
    {
      title: 'Buy currency',
      key: 'creditCurrency',
      dataIndex: 'creditCurrency',
      width: '16.6%',
      ellipsis: true,
      render: (_: void, record: Payment) => {
        return renderColumn(
          record?._id,
          currencyFormatter(currencies, record?.creditCurrency ?? '', record?.mainCreditCurrency ?? '')
        )
      },
    },
    {
      title: 'Sell Amount',
      key: 'debitAmount',
      dataIndex: 'debitAmount',
      width: '16.6%',
      ellipsis: true,
      render: (_: void, record: Payment) => {
        const getCurrencyDecimal = currencies.find((currency: Currency) => record?.creditCurrency === currency?.code)
        return renderColumn(
          record?._id,
          fractionFormat(
            Number(record?.debitAmount ?? 0),
            parseInt(getCurrencyDecimal?.decimals ?? '0')
            // parseInt(getCurrencyDecimal?.decimals ?? "0")
          )
        )
      },
    },
    {
      title: 'Buy Amount',
      key: 'creditAmount',
      dataIndex: 'creditAmount',
      width: '16.6%',
      ellipsis: true,
      render: (_: void, record: Payment) => {
        const getCurrencyDecimal = currencies.find((currency: Currency) => record?.creditCurrency === currency?.code)
        return renderColumn(
          record?._id,
          fractionFormat(
            Number(record?.creditAmount ?? 0),
            parseInt(getCurrencyDecimal?.decimals ?? '0')
            // parseInt(getCurrencyDecimal?.decimals ?? "0")
          )
        )
      },
    },
    {
      title: 'Transaction reference',
      key: 'transactionReference',
      dataIndex: 'transactionReference',
      width: '16.6%',
      render: (_: void, record: Payment) => {
        return (
          <div className={Styles['txn_Ref']}>
            <Icon
              name="copy"
              onClick={() =>
                copy(record?.transactionReference ?? '', {
                  onCopy: Notification({
                    type: 'success',
                    message: 'Copied to clipboard.',
                  }),
                })
              }
            />
            <div style={{ cursor: 'pointer' }} onClick={() => onHandleClickPayment(record?._id ?? '')}>
              {truncateAccountNumber(record?.transactionReference)}
            </div>
          </div>
        )
      },
    },
    {
      key: 'Status',
      title: 'Status',
      dataIndex: 'status',
      width: '16.6%',
      fixed: 'right',
      render: (status: string) => <Status status={status ?? 'pending'} />,
    },
  ]

  const renderColumn = (id: string | undefined, value: string | number | undefined) => {
    return (
      <div
        style={{
          width: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          cursor: 'pointer',
        }}
        onClick={() => onHandleClickPayment(id ?? '')}
      >
        {value}
      </div>
    )
  }

  const totalPaymentsLength = lastPagePayments?.length ? lastPagePayments?.length + 10 : lastPagePayments?.length
  const hasMoreToScroll = lastPagePayments?.length ? true : false
  const tableLoader = paymentsSearchLoading || (allPaymentsLoading && !allPayments.length)

  return (
    <PageWrapper>
      <HeaderWrapper
        loading={allPaymentsLoading}
        onResetSearchCallback={() => resetFilters('ResetSearch')}
        onResetFiltersCallback={() => resetFilters('ResetAdvanceFilters')}
        setIsFormFieldCleared={setIsFormFieldCleared}
        onSubmitPaymentFilters={onSubmit}
      />
      <TableWrapper>
        <InfiniteScroll
          height={tableHeight}
          dataLength={totalPaymentsLength}
          next={() => {
            setIsFormFieldCleared(false)
            lastPagePayments?.length && infiniteScrollHandler()
          }}
          hasMore={hasMoreToScroll}
          loader={<Loader loading={hasScrollActive && allPaymentsLoading} />}
          scrollThreshold="60%"
          scrollableTarget="paymentsScrollDev"
        >
          <Spin loading={tableLoader}>
            <div className={Styles['ds__table']}>
              <Table
                id={'paymentsScrollDev'}
                key={'payments-table'}
                sticky
                rowKey={record => record?.transactionReference}
                dataSource={allPayments}
                tableColumns={columns}
                pagination={false}
                scroll={{
                  x: allPayments?.length && environment ? 1000 : undefined,
                }}
              />
            </div>
          </Spin>
        </InfiniteScroll>
      </TableWrapper>
    </PageWrapper>
  )
}

export { Conversions }
