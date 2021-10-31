import styled from "@emotion/styled";
import PeopleTable from "./peopleTable";

const AppContainer = styled.div`
  max-width: 95%;
  margin: 0 auto;
`;

const App = () => {
  return (
    <AppContainer>
      <PeopleTable />
    </AppContainer>
  );
};

export default App;
