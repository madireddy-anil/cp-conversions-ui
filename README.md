# Micro-frontend Template
Designed to speed up new products transition to MF architecture.

We use **Webpack 5.x** which comes with `ModuleFederationPlugin` out of the box, this enable us to export modules.

# TODO LIST:

- [x] Authentication Setup with Auth0 And Profile API.
- [x] Private and Public Routing setup.
- [ ] State Management with Redux.
  - [X] Base Setup and Structure.
  - [ ] Use Redux-Saga together?
- [ ] Cypress Setup.
  - [x] Base Setup
  - [x] Structure Setup
  - [ ] Base Tests
    - [ ] Authentication
    - [ ] Routes
    - [ ] API's
- [x] Error Boundary for all components.
  - [X] Base Setup.
  - [x] Error page component UI Design.
- [ ] Documentation per folder structure.
- [x] Solve hosting with Authentication for MF
- [ ] Internationalization setup.
  - [ ] Setup of i18n with react-intl
  - [ ] Structure of i18n files





## Testing and using Cypress:
  Your need to add the following cypress .env file: `cypress.env.json`,
  if you have any trouble ask your team about the env file for the project.

```json
  {
    "baseUrl": "http://localhost:3001",
    "api_server": "http://localhost:8888/api/v1/",
    "EMAIL": "{YOUR_EMAIL}",
    "PASSWORD": "{YOUR_PASSWORD}",
    "TOTP_KEY": "{YOUR_TOTP_KEY}",
  }
```

## Preparing your Micro-frontend to be consumed by other projects:
Check your `webpack.js` file to see if you have the following configuration:

```js
    new ModuleFederationPlugin({
      name: "{YOUR_MFE_NAME}", // Your remote MFE name to be used by the host.
      filename: "remoteEntry.js", // The entrypoint for the remote MFE.
      // List of routes exposed to the host.
      // We are exposing both the public and private routes.
      exposes: {
        "./listOfPublicRoutes": "./src/router/PublicRoutes/PublicRouteList.tsx",
        "./listOfPrivateRoutes":
          "./src/router/PrivateRoutes/PrivateRouteList.tsx"
      },
      // List of package modules to share with the remote MFE. 
      // Avoid duplication packages being imported and used.
      shared: [
        {
          ...deps,
          react: { requiredVersion: deps.react, singleton: true },
          "react-dom": {
            requiredVersion: deps["react-dom"],
            singleton: true
          },
          "react-router-dom": {
            requiredVersion: deps["react-router-dom"],
            singleton: true
          },
          "@auth0/auth0-react": {
            singleton: true,
            strictVersion: true
          }
        }
      ]
```

## Using a Micro-frontend HOST in your project:
Your Host `webpack.js` file needs the following configuration:
```js
    new ModuleFederationPlugin({
      name: "{HOST_NAME}",
      filename: "remoteEntry.js",
      // Here you can add any MFE you want to share with the host.
      remotes: {
        {YOUR_REMOTE_NAME}: "{YOUR_REMOTE_NAME}@http://localhost:3000/remoteEntry.js"
      },
      // Your host also need to specify what is common shared packages.
      shared: [
        {
          ...deps,
          react: { requiredVersion: deps.react, singleton: true },
          "react-dom": {
            requiredVersion: deps["react-dom"],
            singleton: true
          },
          "react-router-dom": {
            requiredVersion: deps["react-router-dom"],
            singleton: true
          },
          "@auth0/auth0-react": {
            singleton: true,
            strictVersion: true
          }
        }
      ]
```
