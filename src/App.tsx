import { Link, Route } from 'wouter'

import './App.css'
import Logo from './components/Logo'
import SearchBar from './components/SearchBar'
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
          <Link to="/search/random">Gifs Random</Link>
          <Link to="/search/minecraft">Gifs Minecraft</Link>
          <Link to="/search/amongus">Gifs Among Us</Link>
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
