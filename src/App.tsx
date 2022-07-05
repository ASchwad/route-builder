import React from 'react';
import './App.css';
import Controls from './components/Controls/Controls';
import Map from './components/Map/Map';

export interface ICoordinate {
  lat: number;
  long: number;
}

const initialWaypoints = [
  { lat: 47.24940695788844, long: 11.44088998705618 },
  { lat: 47.21490427494711, long: 11.482081695076108 },
  { lat: 47.20184334794680, long: 11.549347192153748 },
  { lat: 47.16264126922808, long: 11.565827854749378 },
  { lat: 47.12527904224337, long: 11.586428682993947 },
  { lat: 47.12060691750967, long: 11.634497282231193 },
  { lat: 47.14863351130145, long: 11.700419932613753 },
  { lat: 47.20837421346631, long: 11.690806212766274 },
  { lat: 47.23075964834692, long: 11.594669014291743 },
  { lat: 47.27829731797114, long: 11.483424541771226 },
]

function App() {
  const [waypoints, setWaypoints] = React.useState(initialWaypoints);

  return (
    <div className="App">
      <Controls waypoints={waypoints} setWaypoints={setWaypoints} />
      <Map waypoints={waypoints} setWaypoints={setWaypoints} />
    </div>
  );
}

export default App;
