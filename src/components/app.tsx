import styled from "@emotion/styled";
import { Redirect, Route, Switch } from "react-router-dom";
import DataTable from "./dataTable";
import { Person, Planet, Starship } from "../services/swapiService";
import {
  personMapping,
  planetMapping,
  starshipMapping,
} from "../shared/fieldToLabelMapping";
import { SwapiService } from "../services/swapiService";
import Navigation from "./navigation";
const { getPeoplePage, getPlanetsPage, getStarshipsPage } = new SwapiService();

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
          <DataTable<Person> getPage={getPeoplePage} mapping={personMapping} />
        </Route>
        <Route path="/planets">
          <DataTable<Planet> getPage={getPlanetsPage} mapping={planetMapping} />
        </Route>
        <Route path="/starships">
          <DataTable<Starship>
            getPage={getStarshipsPage}
            mapping={starshipMapping}
          />
        </Route>
      </Switch>
    </AppContainer>
  );
};

export default App;
