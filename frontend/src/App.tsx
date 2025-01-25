import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { CollectionDetails } from './pages/collection-details'
import { CollectibleDetails } from './pages/collectible-details'
import { CollectionSettings } from './pages/collection-settings'
import { Collections } from './pages/collections'
import { CollectibleForm } from './pages/collectible-form'
import { CollectionProvider } from './context/collections-context'
import { CollectibleProvider } from './context/collectible-context'
import { CategoryProvider } from './context/category-context'

function App() {

    return (
        <CollectionProvider>
            <CollectibleProvider>
                <CategoryProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Collections />} />
                            <Route path="/collections/:id" element={<CollectionDetails />} />
                            <Route path='/collections/:id/settings' element={<CollectionSettings />} />
                            <Route path="/collections/:id/collectibles/new" element={<CollectibleForm />} />
                            <Route path="/collections/:id/collectibles/:collectibleId" element={<CollectibleDetails />} />
                        </Routes>
                    </BrowserRouter>
                </CategoryProvider>
            </CollectibleProvider>
        </CollectionProvider>
    )
}

export default App
