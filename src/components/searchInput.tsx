import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

const StyledInput = styled.input`
    font-size: 1.3rem;
    padding: 10px 20px;
    border: 0;
    outline: none;
    background-color: #fff;
    color: #000;
    margin: 15px 0;

    :hover,
    :focus {
        background-color: #1f1f1f;
        color: #fff;
    }
`;

interface Props {
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ placeholder, onChange }: Props) => {
    const debouncedOnChange = useMemo(() => debounce(onChange, 300), [onChange]);

    useEffect(() => {
        return () => {
            debouncedOnChange.cancel();
        };
    }, [debouncedOnChange]);

    return <StyledInput placeholder={placeholder} onChange={debouncedOnChange} />;
};

export default SearchInput;
