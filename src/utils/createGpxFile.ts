import { ICoordinate } from "../App";

export default function createGPX(waypoints: ICoordinate[]): void {
  var xmltext = `<?xml version="1.0" encoding="UTF-8"?>
    <gpx
      version="1.1"
      creator="Alexander Schoenenwald"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns="http://www.topografix.com/GPX/1/1"
      xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
      ${waypoints.map((waypoint, index) => "<wpt lat=\"" + waypoint.lat + "\" lon=\"" + waypoint.long + "\"><name>Waypoint" + (index + 1) + "</name></wpt>").join("")}
      <trk>
        <trkseg>
        ${waypoints.map((waypoint, index) => "<trkpt lat=\"" + waypoint.lat + "\" lon=\"" + waypoint.long + "\"></trkpt>").join("")}
        </trkseg>
    </trk>
    </gpx>`;

  var filename = "route.gpx";
  var pom = document.createElement('a');
  var bb = new Blob([xmltext], { type: 'text/plain' });

  pom.setAttribute('href', window.URL.createObjectURL(bb));
  pom.setAttribute('download', filename);

  pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
  pom.draggable = true;
  pom.classList.add('dragout');

  pom.click();
}