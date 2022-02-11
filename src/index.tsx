import React from 'react'
import ReactDOM from 'react-dom'
import { MoralisProvider } from "react-moralis";
import App from './App'
import Providers from './Providers'

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <MoralisProvider appId={process.env.MORALIS_APP_ID} serverUrl={process.env.MORALIS_SERVER_URL} initializeOnMount >
        <App />
      </MoralisProvider>
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)
