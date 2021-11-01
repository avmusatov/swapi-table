export interface Person {
  id: string | null;
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  birthYear: string;
  eyeColor: string;
  gender: "male" | "female" | "n/a";
}

export interface Starship {
  id: string | null;
  name: string;
  model: string;
  manufacturer: string;
  costInCredits: string;
  length: string;
  crew: string;
  passengers: string;
  cargoCapacity: string;
}

export interface Planet {
  id: string | null;
  name: string;
  population: string;
  rotationPeriod: string;
  diameter: string;
}

export class SwapiService {
  _apiBase = "https://swapi.dev/api";

  getResource = async (url: string): Promise<any> => {
    const response = await fetch(`${this._apiBase}${url}`);
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}`);
    }
    const entity = await response.json();
    return entity;
  };

  getPeoplePage = async (
    page = 1
  ): Promise<{ data: Person[]; nextPageExists: boolean }> => {
    const res = await this.getResource(`/people/?page=${page}`);
    return {
      data: res.results.map(this._transformPerson),
      nextPageExists: res.next !== null,
    };
  };

  getPlanetsPage = async (
    page = 1
  ): Promise<{ data: Planet[]; nextPageExists: boolean }> => {
    const res = await this.getResource(`/planets/?page=${page}`);
    return {
      data: res.results.map(this._transformPlanet),
      nextPageExists: res.next !== null,
    };
  };

  getStarshipsPage = async (
    page = 1
  ): Promise<{ data: Starship[]; nextPageExists: boolean }> => {
    const res = await this.getResource(`/starships/?page=${page}`);
    return {
      data: res.results.map(this._transformStarship),
      nextPageExists: res.next !== null,
    };
  };

  _extractId = (url: string) => {
    const idRegExp = /\/(\d*)\/$/;
    const result = url.match(idRegExp);
    return result && result[1];
  };

  _transformPlanet = (planet: any): Planet => {
    return {
      id: this._extractId(planet.url),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  };

  _transformStarship = (starship: any): Starship => {
    return {
      id: this._extractId(starship.url),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity,
    };
  };

  _transformPerson = (person: any): Person => {
    return {
      id: this._extractId(person.url),
      name: person.name,
      height: person.height,
      mass: person.mass,
      hairColor: person.hair_color,
      skinColor: person.skin_color,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
      gender: person.gender,
    };
  };
}
