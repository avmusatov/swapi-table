import { Person, Starship, Planet } from '../services/swapiService';

export const personBasicFields: { field: keyof Person; label: string }[] = [
    { field: 'id', label: 'Id' },
    { field: 'name', label: 'Name' },
    { field: 'height', label: 'Height' },
    { field: 'mass', label: 'Mass' },
    { field: 'hairColor', label: 'Hair color' },
    { field: 'skinColor', label: 'Skin color' },
    { field: 'eyeColor', label: 'Eye color' },
];

export const personAdditionalFields: { field: keyof Person; label: string }[] = [
    { field: 'birthYear', label: 'Year of birth' },
    { field: 'gender', label: 'Sex' },
];

export const planetBasicFields: { field: keyof Planet; label: string }[] = [
    { field: 'id', label: 'Id' },
    { field: 'name', label: 'Name' },
    { field: 'population', label: 'Population' },
    { field: 'rotationPeriod', label: 'Rotation period' },
    { field: 'diameter', label: 'Diameter' },
];

export const planetAdditionalFields: { field: keyof Planet; label: string }[] = [
    { field: 'climate', label: 'Climate' },
    { field: 'gravity', label: 'Gravity' },
    { field: 'terrain', label: 'Terrain' },
    { field: 'surfaceWater', label: 'Surface Water' },
];

export const starshipBasicFields: { field: keyof Starship; label: string }[] = [
    { field: 'id', label: 'Id' },
    { field: 'name', label: 'Name' },
    { field: 'model', label: 'Model' },
    { field: 'manufacturer', label: 'Manufacturer' },
    { field: 'costInCredits', label: 'Cost in credits' },
    { field: 'length', label: 'Length' },
    { field: 'crew', label: 'Crew' },
    { field: 'passengers', label: 'Passengers' },
];

export const starshipAdditionalFields: { field: keyof Starship; label: string }[] = [
    { field: 'cargoCapacity', label: 'Cargo capacity' },
    { field: 'consumables', label: 'Consumables' },
    { field: 'hyperdriveRating', label: 'Hyperdrive Rating' },
    { field: 'starshipClass', label: 'Starship Class' },
];
