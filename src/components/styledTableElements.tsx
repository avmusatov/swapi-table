import styled from '@emotion/styled';

export const Table = styled.table`
    min-width: 100%;
    border-spacing: 0px;
    border-collapse: collapse;
    box-shadow: 0px 0px 11px 4px rgba(0, 0, 0, 0.21);
`;

export const THead = styled.thead`
    font-size: 1.35rem;
    background-color: #fff;
`;
export const TBody = styled.tbody`
    background-color: #1f1f1f;
    color: #fff;
    th {
        border-color: #fff;
    }
`;
export const Tr = styled.tr``;

export const Td = styled.td`
    font-size: 1.1rem;
    padding: 25px 25px;
    border: 1px solid #fff;
    text-align: center;
`;

export const Th = styled.th`
    padding: 25px 25px;
    border: 1px solid #000;
`;
