import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Nav = styled.ul`
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
`;

const NavItem = styled.li`
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
        <Nav>
            <NavItem>
                <Link to="/people">People</Link>
            </NavItem>
            <NavItem>
                <Link to="/planets">Planets</Link>
            </NavItem>
            <NavItem>
                <Link to="/starships">Starships</Link>
            </NavItem>
        </Nav>
    );
};

export default Navigation;
