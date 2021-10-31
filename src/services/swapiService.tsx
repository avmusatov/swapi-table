export interface Person {
  id: number;
  name: string;
  height: number;
  mass: number;
  hairColor: string;
  skinColor: string;
  birthYear: string;
  eyeColor: string;
  gender: "male" | "female" | "n/a";
}

export interface Starship {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  costInCredits: number;
  length: number;
  crew: string;
  passengers: string;
  cargoCapacity: number;
}

export interface Planet {
  id: number;
  name: string;
  population: string;
  rotationPeriod: number;
  diameter: number;
}

export class SwapiService {
  _apiBase = "https://swapi.dev/api";

  getResource = async (url: string) => {
    const response = await fetch(`${this._apiBase}${url}`);
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}`);
    }
    const entity = await response.json();
    return entity;
  };

  getAllPeople = async (): Promise<Person[]> => {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  };

  getPerson = async (id: number) => {
    const person = await this.getResource(`/people/${id}`);
    return this._transformPerson(person);
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  };

  getPlanet = async (id: number) => {
    const planet = await this.getResource(`/planets/${id}`);
    return this._transformPlanet(planet);
  };

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  };

  getStarship = async (id: number) => {
    const starship = await this.getResource(`/starships/${id}`);
    return this._transformStarship(starship);
  };

  _extractId = (url: string) => {
    const idRegExp = /\/(\d*)\/$/;
    const result = url.match(idRegExp);
    return result && result[1];
  };

  _transformPlanet = (planet: any): Planet => {
    return {
      id: Number(this._extractId(planet.url)),
      name: planet.name,
      population: planet.population,
      rotationPeriod: Number(planet.rotation_period),
      diameter: planet.diameter,
    };
  };

  _transformStarship = (starship: any): Starship => {
    return {
      id: Number(this._extractId(starship.url)),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: Number(starship.cost_in_credits),
      length: Number(starship.length),
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: Number(starship.cargo_capacity),
    };
  };

  _transformPerson = (person: any): Person => {
    return {
      id: Number(this._extractId(person.url)),
      name: person.name,
      height: Number(person.height),
      mass: Number(person.mass),
      hairColor: person.hair_color,
      skinColor: person.skin_color,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
      gender: person.gender,
    };
  };
}
