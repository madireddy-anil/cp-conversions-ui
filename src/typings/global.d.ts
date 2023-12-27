declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.sass' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.less' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.styl' {
  const classes: { [key: string]: string }
  export default classes
}

declare module 'newAccounts/NewAccountModal' {
  const NewAccountModal: React.ComponentType<NewAccountModelProps>
  export default NewAccountModal
}

declare interface NewAccountModelProps {
  title?: string
  visible?: boolean
  hideModal?: () => void
  setShowAllAccounts?: (value: boolean) => void
  toggleShowCallback?: (v: boolean) => void
  onSuccessNewAccountCreation?: (v: AccountCreateResponse) => void
  onFailNewAccountCreation?: (v: string) => void
}

declare module '*.png'
declare module '*.svg'
declare module '*.jpeg'
declare module '*.jpg'
