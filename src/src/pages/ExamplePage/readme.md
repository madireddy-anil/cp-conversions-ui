# Example page component

## Description

The file responsible for the deciding which type of page to render is `index.tsx`.

The index file will take the AuthContext and the current page and determine which page to render, based on portalType property.

```tsx
if (portal === PortalEnum.CMS) return <ClientComponent />
if (portal === PortalEnum.BMS) return <AdminComponent />
```
