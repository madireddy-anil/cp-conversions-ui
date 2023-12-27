import { Avatar, Dropdown, Topbar as DSTopBar, Spacer, TopbarContent } from '@payconstruct/design-system'
import { Menu, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { logoutUrl } from 'config/variables'
import React, { useContext, useMemo } from 'react'
import { AuthContext, PortalEnum } from '@payconstruct/orbital-auth-provider'

interface TopbarProps {
  title: string
  parentPage?: string
}

export const TopBar: React.FC<TopbarProps> = ({ title, parentPage }) => {
  const navigate = useNavigate()

  const { listOfOrganizations, authenticateOrganization, orgId, logout, portal } = useContext(AuthContext)

  const goBackAction = () => {
    if (parentPage) return navigate(parentPage)

    return navigate(-1)
  }

  const ListOfCompanies = useMemo(() => {
    return listOfOrganizations?.map(org => {
      return {
        key: org.organisationId,
        title: org.registeredCompanyName,
        issubmenu: false,
        onClick: () => authenticateOrganization(org.organisationId),
      }
    })
  }, [listOfOrganizations])

  const selectedCompany = useMemo(() => {
    if (!orgId) return 'Waiting for company selection...'
    if (!ListOfCompanies) return 'Company Loading...'

    return ListOfCompanies?.find(org => org.key === orgId)?.title
  }, [ListOfCompanies, orgId])

  return (
    <>
      <Spacer size={56} />
      <DSTopBar
        showBack={true}
        showBackIcon={parentPage ? 'close' : 'leftArrow'}
        goBackAction={goBackAction}
        title={title}
      >
        <TopbarContent.RightSide>
          {portal === PortalEnum.CMS && (
            <Dropdown
              text={selectedCompany}
              type="link"
              dropdownmenu={ListOfCompanies?.filter(org => org.key !== orgId)}
              disabled={listOfOrganizations == null}
              trigger={['click']}
            />
          )}

          <Dropdown disabled>
            <Button disabled>TimeZone: {'HKT'}</Button>
          </Dropdown>
          <Dropdown
            arrow
            overlay={
              <Menu>
                <Menu.Item key="logout" onClick={() => logout({ returnTo: logoutUrl })}>
                  Logout
                </Menu.Item>
              </Menu>
            }
            placement="bottomLeft"
          >
            <Avatar size={24} src="https://th.bing.com/th/id/OIP.VoW0K-83DzwOxVQBEW5uYAHaJQ?pid=ImgDet&rs=1" />
          </Dropdown>
        </TopbarContent.RightSide>
      </DSTopBar>
    </>
  )
}
