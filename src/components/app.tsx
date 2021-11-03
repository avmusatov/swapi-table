import styled from '@emotion/styled';
import { Redirect, Route, Switch } from 'react-router-dom';
import DataTable from './dataTable';
import { Person, Planet, Starship } from '../services/swapiService';
import {
    personBasicFields,
    personAdditionalFields,
    planetBasicFields,
    planetAdditionalFields,
    starshipBasicFields,
    starshipAdditionalFields,
} from '../shared/fieldToLabelMapping';
import { SwapiService } from '../services/swapiService';
import Navigation from './navigation';
const { getPeoplePage, getPlanetsPage, getStarshipsPage, getPersonImage, getPlanetImage, getStarshipImage } =
    new SwapiService();

const AppContainer = styled.div`
    max-width: 95%;
    margin: 0 auto;
`;

const App = () => {
    return (
        <AppContainer>
            <Navigation />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/people" />
                </Route>
                <Route path="/people">
                    <DataTable<Person>
                        getPage={getPeoplePage}
                        getImage={getPersonImage}
                        basicFields={personBasicFields}
                        additionalFields={personAdditionalFields}
                    />
                </Route>
                <Route path="/planets">
                    <DataTable<Planet>
                        getPage={getPlanetsPage}
                        getImage={getPlanetImage}
                        basicFields={planetBasicFields}
                        additionalFields={planetAdditionalFields}
                    />
                </Route>
                <Route path="/starships">
                    <DataTable<Starship>
                        getPage={getStarshipsPage}
                        getImage={getStarshipImage}
                        basicFields={starshipBasicFields}
                        additionalFields={starshipAdditionalFields}
                    />
                </Route>
            </Switch>
        </AppContainer>
    );
};

export default App;
