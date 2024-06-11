// Interface representing the properties of a starship.
export interface StarShip {
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  pilots: string[];
  created: string;
  edited: string;
  name: string;
  url: string;
}

// Interface representing the result of the API call, which includes starship properties and additional metadata.
export interface StarshipResult {
  properties: StarShip;
  description: string;
  _id: string;
  uid: string;
  __v: number;
}

// Interface representing the full API response, including the result object.
export interface StarshipApiResponse {
  message: string;
  result: StarshipResult;
}
