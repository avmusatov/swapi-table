import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import Spinner from './spinner';
import Details from './details';
import SearchInput from './searchInput';
import { Table, THead, TBody, Th, Tr, Td } from './styledTableElements';
import styled from '@emotion/styled';

interface TdProps<T> {
    item: any;
    basicFields: { field: keyof T; label: string }[];
    additionalFields?: { field: keyof T; label: string }[];
    getImage: (id: string) => string;
}

const TdExpandable = <T,>(props: React.PropsWithChildren<TdProps<T>>): JSX.Element => {
    const { item, basicFields, additionalFields, getImage } = props;
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <>
            <Tr onClick={additionalFields ? () => setIsExpanded((isExpanded) => !isExpanded) : undefined}>
                {basicFields.map(({ field }) => (
                    <Td key={String(field)}>{item[field]}</Td>
                ))}
            </Tr>
            {isExpanded && (
                <Tr>
                    <Td colSpan={100}>
                        <Details item={item} getImageUrl={getImage} displayedFields={additionalFields} />
                    </Td>
                </Tr>
            )}
        </>
    );
};
interface IconProps {
    active?: boolean;
}

const SortIcon = styled.i<IconProps>`
    position: absolute;
    top: 44%;
    font-size: 1rem;
    right: 5px;
    cursor: pointer;
    color: ${({ active }) => (active ? '#1d3377' : 'black')};
`;

interface Props<T> {
    getPage: (page: number, searchValue?: string) => Promise<{ data: T[]; nextPageExists: boolean }>;
    basicFields: { field: keyof T; label: string }[];
    additionalFields?: { field: keyof T; label: string }[];
    getImage: (id: string) => string;
}

const DataTable = <T,>(props: React.PropsWithChildren<Props<T>>): JSX.Element => {
    const { getPage, basicFields, additionalFields, getImage } = props;

    const [searchValue, setSearchValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [items, setItems] = useState<any[]>([]);
    const [nextPage, setNextPage] = useState<number>(1);
    const [lastRowInView, setLastRowInView] = useState<boolean>(false);
    const [canGetNextPage, setCanGetNextPage] = useState<boolean>(false);
    const [columnSortBy, setColumnSortBy] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'a-z' | 'z-a'>('a-z');
    const lastRowRef = useRef(null);

    const getFirstPage = useCallback(() => {
        setItems([]);
        setLoading(true);
        setCanGetNextPage(false);
        getPage(1, searchValue)
            .then(({ data, nextPageExists }) => {
                setItems(data);
                setCanGetNextPage(nextPageExists);
                setNextPage(2);
            })
            .catch((err) => {
                setError(err.toString());
            })
            .finally(() => {
                setLoading(false);
            });
    }, [getPage, searchValue]);

    const requestSorting = useCallback(
        (field: string) => {
            if (!columnSortBy || columnSortBy !== String(field)) {
                setSortOrder('a-z');
                setColumnSortBy(field);
            } else if (columnSortBy === String(field) && sortOrder === 'a-z') {
                setSortOrder('z-a');
            } else if (columnSortBy === String(field) && sortOrder === 'z-a') {
                setSortOrder('a-z');
                setColumnSortBy('');
                getFirstPage();
            }
        },
        [columnSortBy, getFirstPage, sortOrder]
    );

    const sortItems = useCallback(
        (items: any[]) =>
            [...items].sort((a, b) => {
                const left = isNaN(a[columnSortBy]) ? a[columnSortBy] : Number(a[columnSortBy]);
                const right = isNaN(b[columnSortBy]) ? b[columnSortBy] : Number(b[columnSortBy]);

                if (left === 'unknown') {
                    return 1;
                }
                if (right === 'unknown') {
                    return -1;
                }
                if (left < right) {
                    return sortOrder === 'a-z' ? -1 : 1;
                }
                if (left > right) {
                    return sortOrder === 'a-z' ? 1 : -1;
                }
                return 0;
            }),
        [columnSortBy, sortOrder]
    );

    const getNextPage = useCallback(() => {
        setLoading(true);
        setCanGetNextPage(false);
        if (canGetNextPage) {
            getPage(nextPage, searchValue)
                .then(({ data, nextPageExists }) => {
                    const newItems = columnSortBy ? sortItems([...items, ...data]) : [...items, ...data];
                    setItems(newItems);
                    setCanGetNextPage(nextPageExists);
                    setNextPage((x) => x + 1);
                })
                .catch((err) => {
                    setError(err.toString());
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [canGetNextPage, getPage, nextPage, searchValue, columnSortBy, sortItems, items]);

    useEffect(getFirstPage, [getFirstPage]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => setLastRowInView(entries[0].isIntersecting), {
            threshold: 0.1,
        });
        if (lastRowRef.current) {
            observer.observe(lastRowRef.current);
        }
        return () => {
            observer.disconnect();
        };
    });

    useEffect(() => {
        if (lastRowInView) {
            getNextPage();
        }
    }, [getNextPage, lastRowInView]);

    const onSeachQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setColumnSortBy('');
        setSortOrder('a-z');
        setSearchValue(e.target.value);
    }, []);

    useEffect(() => setItems((items) => sortItems(items)), [sortItems]);

    if (error) return <p>Error: {error}</p>;
    return (
        <>
            <SearchInput placeholder={'Type a query here'} onChange={onSeachQueryChange} />
            <Table>
                <THead>
                    <Tr>
                        {basicFields.map(({ field, label }) => (
                            <Th key={String(field)}>
                                <span>{label}</span>
                                <SortIcon
                                    className="fas fa-sort"
                                    active={Boolean(columnSortBy) && columnSortBy === String(field)}
                                    onClick={() => requestSorting(String(field))}
                                />
                            </Th>
                        ))}
                    </Tr>
                </THead>
                <TBody>
                    {items.map((item) => (
                        <TdExpandable
                            key={item.id}
                            item={item}
                            basicFields={basicFields}
                            additionalFields={additionalFields}
                            getImage={getImage}
                        />
                    ))}
                </TBody>
            </Table>
            {loading && <Spinner />}
            {canGetNextPage && <div ref={lastRowRef} />}
        </>
    );
};

export default DataTable;
