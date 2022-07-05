# Route builder
Route builder enables you to plan your route via bare waypoints for your next session of cross country running. You can place markers on the map which will form your route. You can rearrange or delete them until the route looks good to you!

## Getting started with the code
`yarn install` to install the dependencies
`yarn start` to start the server locally


## Requirements
### Essential
- [x] Show waypoints in map
- [x] Show waypoints in Controls
- [x] Add and remove waypoints
- [x] Connect waypoints with lines based on their order
- [x] Prepare and download route as GPX file
- [x] Change order of the waypoints in Controls section via Drag and drop

### Optional
- [x] Calculate distance
- [x] Drag and drop of waypoints in Map
- [x] Try not to use 3rd party libraries for prebuilt components 

## What I've learned
It was quite exciting to build this project without using 3rd party libraries for the major tasks. 
I will share my process within the following the task areas: Map and Controls

### Map
Visualizing a map with markers and lines without the `react-leaflet` library required a bit more research of the standard leaflet documentation. But it was easier to solve than I initially expected. Critical moments to solve the task were the following:
* Using a Ref for the map component enabled me to programmatically manipulate the shown elements on the map whenever the waypoints changed.
* The approach to rerender all elements on the map as soon as one waypoint changes was easy to implement, but will run into performance issues on larger routes.
* Drawing a circle with a label for the waypoints was harder than expected, but more research of the documentation led to the solution via `divIcon`.
* Although the drag functionality of the waypoints was not an explicit requirement, it appeared to me as a good addition in terms of usability for the app. Making marker draggable in leaflet is easy, but efficiently updating the connected lines to the dragged waypoint was a bit more complicated. After determining the affected lines of the dragged waypoint, the lines are removed and rerendered with the new position of the dragged waypoint.

### Controls
Implementing the controls without a component / styling library like `material-ui` or `tailwind css` refreshed my CSS skills, but took me a bit more time than usual. By using the basic HTML interfaces, the drag and drop functionality was easier to implement than expected. I would have been probably faster with libraries like `react-dnd` or `framer motion`, but I appreciate knowing the logic behind and to keep in control over the source code for trivial features. I did not know before, that the interfaces behind e.g. a `<div>` provide powerful event listener such as `onDragStart` and `onDragEnd`.
Lastly, I solved the functionality to provide the GPX file as a download with a rather simple approach: The metadata as string is concatenated with each of the waypoints as string and then transformed via a `Blob`. Other solutions could have made use of e.g. `new XMLDocument` or libraries like `gpx-builder`, but do not justify the extra effort of an extra library for this trivial data export.