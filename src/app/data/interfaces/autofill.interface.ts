export interface Address {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:         string;
    type:       string;
    place_type: string[];
    relevance:  number;
    properties: Properties;
    text:       string;
    place_name: string;
    center:     number[];
    geometry:   Geometry;
    context:    Context[];
}

export interface Context {
    id:          string;
    mapbox_id:   string;
    wikidata?:   string;
    text:        string;
    short_code?: ShortCode;
}

export enum ShortCode {
    Es = "es",
    EsB = "ES-B",
}

export interface Geometry {
    coordinates: number[];
    type:        string;
}

export interface Properties {
    wikidata?:  string;
    category:   string;
    landmark:   boolean;
    address?:   string;
    foursquare: string;
}