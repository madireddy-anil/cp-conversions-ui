import React, { useContext, useState } from 'react'
import { Search as Searcher } from '@payconstruct/design-system'

import { useDebounce } from '@payconstruct/fe-utils/dist/Hooks/useDebounce'
import { PaymentFilterForm } from 'pages/Conversions/Conversions.interface'
import { ConversionsContext } from 'context/Provider'
import { SetConversionsFilters, SetSearchText } from 'context/Actions'

interface SearchProps {
  selectedTab: string
  beneSearchText: string
  paymentsSearchText: string
  isFiltersActive: boolean
  conversionsFilters: PaymentFilterForm
  onClearCallback: () => void
}

const Search: React.FC<SearchProps> = ({ selectedTab, conversionsFilters, onClearCallback }) => {
  const { dispatch } = useContext(ConversionsContext)
  const [searchKey, setSearchKey] = useState<string>('')

  useDebounce(
    () => {
      dispatch(SetSearchText(searchKey))
      dispatch(SetConversionsFilters({ ...conversionsFilters }, undefined))
    },
    400,
    [searchKey]
  )

  const onChangeSearch = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(value)
    !value && onClearCallback()
  }

  return (
    <div>
      <Searcher
        name={selectedTab}
        bordered={true}
        onChange={onChangeSearch}
        placeholder={'Search by sell/buy currency or transaction reference.'}
        onClear={() => onClearCallback()}
      />
      {/* {isFiltersActive && (beneSearchText || paymentsSearchText) && (
        <>
          <Text size="xxsmall">
            Your search results are affected by the filters you have applied. To
            expand your search, please clear your filters.
          </Text>
          <Spacer size={10} />
        </>
      )} */}
    </div>
  )
}

export { Search }
