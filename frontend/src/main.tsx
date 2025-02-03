import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ChakraProvider } from './components/ui/provider.tsx';
import { Provider } from 'react-redux';
import { store } from './state/store.ts';
import { fetchCollections } from './state/collection-slice.ts';
import { api } from './utils/api.ts';
import App from './App.tsx';

async function checkApiHealth() {
    const maxRetries = 5
    let retries = 0

    while (retries < maxRetries) {
        try {
            const response = await api.get('/health')
            if (response.status === 200) return true
        } catch (error) {
            console.error('api unavailable, retrying...', error)
        }

        await new Promise((resolve) => setTimeout(resolve, 2000))
        retries++
    }

    console.error(`api unavailable, fetched ${retries} times.`)
    return false
}

async function start() {
    const healthy = await checkApiHealth()
    if (healthy) {
        store.dispatch(fetchCollections())
    } else {
        console.error('api unavailable.')
    }

    const root = createRoot(document.getElementById('root')!)

    root.render(
        <StrictMode>
            <Provider store={store}>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </Provider>
        </StrictMode>
    )
}

start()

