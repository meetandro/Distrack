import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './state/store.ts'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider value={defaultSystem}>
                <App />
            </ChakraProvider>
        </Provider>
    </StrictMode>,
)

