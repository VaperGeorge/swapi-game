import {
  API_URL,
  PersonInfo,
  ResourceListItem,
  ResourceListResponse,
  StarShip,
} from '../../shared';

export const mockPerson: PersonInfo = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  created: '11/11/2222',
  edited: '11/11/2222',
  homeworld: 'https://www.swapi.tech/api/planets/1',
  url: 'https://www.swapi.tech/api/people/1',
};

export const mockStarShip: StarShip = {
  name: 'Death Star',
  model: 'DS-1 Orbital Battle Station',
  starship_class: 'Deep Space Mobile Battlestation',
  manufacturer:
    'Imperial Department of Military Research, Sienar Fleet Systems',
  cost_in_credits: '1000000000000',
  length: '120000',
  crew: '342,953',
  passengers: '843,342',
  max_atmosphering_speed: 'n/a',
  hyperdrive_rating: '4.0',
  MGLT: '10',
  created: '11/11/2222',
  edited: '11/11/2222',
  pilots: ['Obi', 'One'],
  cargo_capacity: '1000000000000',
  consumables: '3 years',
  url: 'https://www.swapi.tech/api/starships/9',
};

export const mockPersons: ResourceListItem[] = [
  { uid: '1', name: 'Luke Skywalker', url: `${API_URL}/people/1` },
  { uid: '2', name: 'Darth Vader', url: `${API_URL}/people/2` },
];

export const mockResponse: ResourceListResponse = {
  message: 'ok',
  results: mockPersons,
  total_records: 2,
  total_pages: 4,
  previous: '3',
  next: '2',
};
