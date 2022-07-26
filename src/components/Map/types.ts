// Interfaces extracted from API result via https://jsonformatter.org/json-to-typescript
export interface IRouteResult {
    features: Feature[];
    statusCode?: number;
}

export interface Feature {
    type: string;
    properties: Metadata;
    geometry: Geometry;
}

export interface Geometry {
    type: string;
    coordinates: Array<Array<number[]>>;
}

export interface Metadata {
    mode: string;
    waypoints: Waypoint[];
    units: string;
    distance: number;
    distance_units: string;
    time: number;
    legs: Leg[];
}

export interface Leg {
    distance: number;
    time: number;
    steps: Step[];
}

export interface Step {
    from_index: number;
    to_index: number;
    distance: number;
    time: number;
    instruction: Instruction;
}

export interface Instruction {
    text: string;
}

export interface Waypoint {
    location: number[];
    original_index: number;
}
