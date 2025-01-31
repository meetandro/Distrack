import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './state/store.ts'
import './index.css'
import App from './App.tsx'
import { fetchCollections } from './state/collectionSlice.ts'

async function start() {
    store.dispatch(fetchCollections())

    const root = createRoot(document.getElementById('root')!)

    root.render(
        <StrictMode>
            <Provider store={store}>
                <ChakraProvider value={defaultSystem}>
                    <App />
                </ChakraProvider>
            </Provider>
        </StrictMode>
    )
}

start()

