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
