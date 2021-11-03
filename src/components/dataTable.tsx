import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import Spinner from './spinner';
import Details from './details';
import SearchInput from './searchInput';
import { Table, THead, TBody, Th, Tr, Td } from './styledTableElements';

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
            <Tr key={item.id} onClick={additionalFields ? () => setIsExpanded((isExpanded) => !isExpanded) : undefined}>
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
    const lastRowRef = useRef(null);

    const getFirstPage = useCallback(() => {
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

    const getNextPage = useCallback(() => {
        setLoading(true);
        setCanGetNextPage(false);
        if (canGetNextPage) {
            getPage(nextPage, searchValue)
                .then(({ data, nextPageExists }) => {
                    setItems([...items, ...data]);
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
    }, [canGetNextPage, getPage, nextPage, items, searchValue]);

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

    const onSeachQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value), []);

    if (error) return <p>Error: {error}</p>;
    return (
        <>
            <SearchInput placeholder={'Type a query here'} onChange={onSeachQueryChange} />
            <Table>
                <THead>
                    <Tr>
                        {basicFields.map(({ field, label }) => (
                            <Th key={String(field)}>{label}</Th>
                        ))}
                    </Tr>
                </THead>
                <TBody>
                    {items.map((item) => (
                        <TdExpandable
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
