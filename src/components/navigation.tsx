import styled from "@emotion/styled";
import { Link } from "react-router-dom";
const List = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
`;

const ListItem = styled.li`
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 10px 25px;
    text-decoration: none;
    color: #000;
    font-size: 1.5rem;
    border: 1px solid #000;

    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
`;
const Navigation = () => {
  return (
    <List>
      <ListItem>
        <Link to="/people">People</Link>
      </ListItem>
      <ListItem>
        <Link to="/planets">Planets</Link>
      </ListItem>
      <ListItem>
        <Link to="/starships">Starships</Link>
      </ListItem>
    </List>
  );
};

export default Navigation;
