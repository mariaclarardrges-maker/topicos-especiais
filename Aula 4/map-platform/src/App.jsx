import { useMemo, useState } from 'react';
import { MapView } from './components/MapView';
import { places, routeOptions } from './services/places';

const DEFAULT_CENTER = [20, 0];
const FAKE_USER = { email: 'admin@map.com', password: '123456' };

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="github-mark" role="img">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.12.79-.25.79-.56v-2.13c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.39.96.1-.75.41-1.26.74-1.55-2.55-.3-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.09-.12-.3-.51-1.52.11-3.17 0 0 .96-.31 3.14 1.18a10.84 10.84 0 0 1 5.72 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.65.23 2.87.11 3.17.74.8 1.17 1.83 1.17 3.09 0 4.43-2.7 5.4-5.27 5.68.42.37.8 1.1.8 2.22v3.3c0 .31.2.69.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    email: 'admin@map.com',
    password: '123456',
  });
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Fitness');
  const [selectedPlace, setSelectedPlace] = useState(
    places.find((place) => place.category === 'Fitness') || places[0],
  );
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState(null);
  const [originPoint, setOriginPoint] = useState('Casa');
  const [routeMode, setRouteMode] = useState('car');
  const [routePoints, setRoutePoints] = useState([
    [-15.794, -47.883],
    [-15.788, -47.881],
  ]);
  const [layer, setLayer] = useState('street');

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
      const matchesSearch = !search || place.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  const suggestions = useMemo(() => filteredPlaces.slice(0, 5), [filteredPlaces]);
  const routeConfig = routeOptions.find((option) => option.id === routeMode) || routeOptions[0];

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (
      loginData.email.trim() === FAKE_USER.email &&
      loginData.password.trim() === FAKE_USER.password
    ) {
      setIsLoggedIn(true);
      setError('');
      setMapCenter(DEFAULT_CENTER);
      return;
    }

    setError('Credenciais inválidas. Tente admin@map.com / 123456');
  };

  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada neste navegador.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = [position.coords.latitude, position.coords.longitude];
        setUserLocation(location);
        setMapCenter(location);
        setSelectedPlace({
          id: 'me',
          name: 'Sua localização',
          category: 'Local atual',
          coords: location,
        });
        setError('');
      },
      () => {
        setError('Não foi possível acessar sua localização atual.');
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const handleSuggestionClick = (place) => {
    setSelectedPlace(place);
    setMapCenter(place.coords);
    setSearch(place.name);
    setRoutePoints([place.coords, DEFAULT_CENTER]);
  };

  const handleRouteSubmit = () => {
    const end = selectedPlace.coords;
    const start =
      originPoint === 'Local atual'
        ? userLocation || DEFAULT_CENTER
        : originPoint === 'Escritório'
          ? [-15.797, -47.88]
          : DEFAULT_CENTER;
    setRoutePoints([start, end]);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <div className="brand-panel">
            <div className="brand-box">
              <span className="brand-mark"><GithubMark /></span>
              <span>MapFlow</span>
            </div>

            <div className="company-copy">
              <span className="eyebrow">Plataforma integrada</span>
              <h2>Mapas inteligentes para decisões em tempo real</h2>
            </div>

            <div className="brand-stats">
              <div>
                <strong>24K</strong>
                <span>pontos mapeados</span>
              </div>
              <div>
                <strong>8.4x</strong>
                <span>mais eficiência</span>
              </div>
            </div>
          </div>

          <div className="login-panel">
            <p className="intro-label">Acesse sua conta</p>
            <h1>Bem-vindo de volta</h1>
            <p>Entre para acessar o painel de mapas inteligentes.</p>

            <form className="login-form" onSubmit={handleLoginSubmit}>
            <label>
              E-mail
              <input
                type="email"
                value={loginData.email}
                onChange={(event) =>
                  setLoginData((current) => ({ ...current, email: event.target.value }))
                }
              />
            </label>

            <label>
              Senha
              <input
                type="password"
                value={loginData.password}
                onChange={(event) =>
                  setLoginData((current) => ({ ...current, password: event.target.value }))
                }
              />
            </label>

              <button type="submit" className="primary-btn">
                Entrar
              </button>

              {error && <p className="form-error">{error}</p>}
            </form>

            <div className="demo-box">
              <span>Demo:</span>
              <strong>admin@map.com</strong>
              <strong>123456</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="brand-box">
            <span className="brand-mark"><GithubMark /></span>
            <span>MapFlow</span>
          </div>
          <button className="icon-button" type="button" onClick={() => setSidebarOpen((value) => !value)}>
            ☰
          </button>
        </div>

        <nav className="side-nav">
          {['Explorar mapa', 'Locais favoritos', 'Histórico de pesquisas', 'Rotas recentes', 'Pontos de interesse', 'Configurações'].map((item, index) => (
            <button key={item} className={index === 0 ? 'nav-item active' : 'nav-item'} type="button">
              {item}
            </button>
          ))}
        </nav>

        <div className="mini-card">
          <span className="eyebrow">Resumo</span>
          <h3>{selectedPlace.name}</h3>
          <p>{selectedPlace.category}</p>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar endereço, cidade ou estabelecimento"
            />
          </div>

          <div className="top-actions">
            <button className="secondary-btn" type="button" onClick={handleLocateUser}>
              Minha localização
            </button>
            <button
              className="secondary-btn accent"
              type="button"
              onClick={() => setLayer((current) => (current === 'street' ? 'satellite' : 'street'))}
            >
              {layer === 'street' ? 'Satélite' : 'Mapa'}
            </button>
          </div>
        </header>

        {search && (
          <div className="search-suggestions">
            {suggestions.map((place) => (
              <button key={place.id} type="button" onClick={() => handleSuggestionClick(place)}>
                {place.name}
              </button>
            ))}
          </div>
        )}

        <div className="map-shell">
          <MapView
            center={mapCenter}
            selectedPlace={selectedPlace}
            userLocation={userLocation}
            routePoints={routePoints}
            layer={layer}
            places={filteredPlaces}
            onSelectMarker={setSelectedPlace}
          />

          <div className="floating-panel">
            <div className="panel-header">
              <span className="eyebrow">Rota</span>
              <h3>Trajeto atual</h3>
            </div>

            <div className="route-grid">
              <div className="field-group">
                <label>Partida</label>
                <select value={originPoint} onChange={(event) => setOriginPoint(event.target.value)}>
                  <option>Local atual</option>
                  <option>Casa</option>
                  <option>Escritório</option>
                </select>
              </div>

              <div className="field-group">
                <label>Destino</label>
                <select
                  value={selectedPlace.name}
                  onChange={(event) => {
                    const chosen = places.find((item) => item.name === event.target.value);
                    if (chosen) {
                      setSelectedPlace(chosen);
                      setMapCenter(chosen.coords);
                    }
                  }}
                >
                  {places.map((place) => (
                    <option key={place.id} value={place.name}>
                      {place.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mode-toggle">
              {routeOptions.map((option) => (
                <button
                  key={option.id}
                  className={routeMode === option.id ? 'mode active' : 'mode'}
                  type="button"
                  onClick={() => setRouteMode(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <button className="primary-btn route-btn" type="button" onClick={handleRouteSubmit}>
              Calcular rota
            </button>

            <div className="route-summary">
              <div>
                <span>Distância</span>
                <strong>{routeConfig.distance}</strong>
              </div>
              <div>
                <span>Tempo</span>
                <strong>{routeConfig.time}</strong>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
