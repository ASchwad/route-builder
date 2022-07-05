import React from 'react';
import './App.css';
import Controls from './Controls/Controls';
import Map from './Map/Map';

export interface ICoordinate {
  lat: number;
  long: number;
}

const initialWaypoints = [
  { lat: 47.30319, long: 11.44567 },
  { lat: 47.00319, long: 11.40567 },
  { lat: 47.10319, long: 11.54567 },
]

function App() {
  const [waypoints, setWaypoints] = React.useState(initialWaypoints);

  return (
    <div className="App">
      <Controls waypoints={waypoints} setWaypoints={setWaypoints} />
      <Map waypoints={waypoints} />
    </div>
  );
}

export default App;
