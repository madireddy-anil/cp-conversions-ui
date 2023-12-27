import { AuthContext } from '@payconstruct/orbital-auth-provider'
import { newPayment } from 'config/variables'
import { useContext, useState } from 'react'

/**
 ** accountId: string;                // selectedAccount id
 ** debitCurrency: string;            // selectedAccount currency
 ** debitAmount: string;              // Amount to be sent
 ** creditCurrency: string;           // beneficiary.currency == selectedAccount currency
 ** creditAmount: string;             // paymentDetails?.creditAmount
 ** remittanceInformation: string;    // paymentRemarks
 ** requestSource: "clientPortal";
 */
export type CreatePaymentRequest = {
  accountId: string // selectedAccount id
  debitCurrency: string // selectedAccount currency
  debitAmount: string // Amount to be sent
  creditCurrency: string // beneficiary.currency == selectedAccount currency
  creditAmount: string // paymentDetails?.creditAmount
  remittanceInformation?: string // paymentRemarks
  creditorAccountId: string // External settlementType
  requestSource: 'clientPortal'
}

type CreatePaymentResponse = {
  data: { transactionReference: string }
  statusCode: number
}

export const useNewPaymentMutation = (): [
  (newPaymentData: CreatePaymentRequest) => Promise<CreatePaymentResponse>,
  { loading: boolean; data?: CreatePaymentResponse['data'] }
] => {
  const [payment, setPayment] = useState<CreatePaymentResponse['data']>()
  const [loading, setLoading] = useState(false)
  const { token = '' } = useContext(AuthContext)

  /**
   *  Return a function to make a POST request for New Payment
   * @param data post request data to send.
   */
  const createNewPayment = async (newPaymentData: CreatePaymentRequest): Promise<CreatePaymentResponse> => {
    setLoading(true)

    return await fetch(newPayment, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPaymentData),
    })
      .then(response => response.json())
      .then((data: CreatePaymentResponse) => {
        const transactionReference = data?.data?.transactionReference ?? undefined
        setPayment({ transactionReference: transactionReference })
        return data
      })
      .catch(err => {
        return err
      })
      .finally(() => setLoading(false))
  }

  return [createNewPayment, { loading: loading, data: payment }]
}
