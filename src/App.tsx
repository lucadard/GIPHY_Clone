import { Route } from 'wouter'

import './App.css'
import Logo from './components/Logo'
import SearchBar from './components/SearchBar'
import TrendingSearches from './components/RelatedTerms'
import GifList from './components/GifList'
import GifDetail from './components/GifDetail'
import { GifsContextProvider } from './context/GifsContext'

function App() {
  return (
    <div className="App">
      <Logo />
      <SearchBar />
      <GifsContextProvider>
        <Route path="/">
          <TrendingSearches type='trending' />
        </Route>
        <Route
          path="/search/:searchTerm"
          component={GifList}
        />
        <Route
          path="/gifs/:id"
          component={GifDetail}
        />
      </GifsContextProvider>
    </div>
  )
}

export default App
