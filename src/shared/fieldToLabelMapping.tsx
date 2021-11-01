import { Person, Starship, Planet } from "../services/swapiService";

export const personMapping: { field: keyof Person; label: string }[] = [
  { field: "id", label: "Id" },
  { field: "name", label: "Name" },
  { field: "height", label: "Height" },
  { field: "mass", label: "Mass" },
  { field: "hairColor", label: "Hair color" },
  { field: "skinColor", label: "Skin color" },
  { field: "eyeColor", label: "Eye color" },
  { field: "birthYear", label: "Year of birth" },
  { field: "gender", label: "Sex" },
];

export const planetMapping: { field: keyof Planet; label: string }[] = [
  { field: "id", label: "Id" },
  { field: "name", label: "Name" },
  { field: "population", label: "Population" },
  { field: "rotationPeriod", label: "Rotation period" },
  { field: "diameter", label: "Diameter" },
];

export const starshipMapping: { field: keyof Starship; label: string }[] = [
  { field: "id", label: "Id" },
  { field: "name", label: "Name" },
  { field: "model", label: "Model" },
  { field: "manufacturer", label: "Manufacturer" },
  { field: "costInCredits", label: "Cost in credits" },
  { field: "length", label: "Length" },
  { field: "crew", label: "Crew" },
  { field: "passengers", label: "Passengers" },
  { field: "cargoCapacity", label: "Cargo capacity" },
];
