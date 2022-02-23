import React from 'react'
import ReactDOM from 'react-dom'
import { MoralisProvider } from "react-moralis";
import App from './App'
import Providers from './Providers'

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={process.env.REACT_APP_MORALIS_APP_ID} serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL} >
    <Providers>
        <App />
    </Providers>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
