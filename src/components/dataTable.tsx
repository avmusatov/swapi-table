import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "./loader";
import { Table, THead, TBody, Th, Tr } from "./styledTableElements";

interface Props<T> {
  getPage: (page: number) => Promise<{ data: T[]; nextPageExists: boolean }>;
  mapping: { field: keyof T; label: string }[];
}

const DataTable = <T,>(
  props: React.PropsWithChildren<Props<T>>
): JSX.Element => {
  const { getPage, mapping } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<number>(1);
  const [lastRowInView, setLastRowInView] = useState<boolean>(false);
  const [canGetNextPage, setCanGetNextPage] = useState<boolean>(false);
  const lastRowRef = useRef(null);

  const getFirstPage = useCallback(() => {
    setLoading(true);
    setCanGetNextPage(false);
    getPage(1)
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
  }, [getPage]);

  const getNextPage = useCallback(() => {
    setLoading(true);
    setCanGetNextPage(false);
    if (canGetNextPage) {
      getPage(nextPage)
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
  }, [canGetNextPage, getPage, nextPage, items]);

  useEffect(getFirstPage, [getFirstPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setLastRowInView(entries[0].isIntersecting),
      { threshold: 0.1 }
    );
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

  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <Table>
        <THead>
          <Tr>
            {mapping.map(({ field, label }) => (
              <Th key={String(field)}>{label}</Th>
            ))}
          </Tr>
        </THead>
        <TBody>
          {items.map((item) => (
            <Tr key={item.id}>
              {mapping.map(({ field }) => (
                <Th key={String(field)}>{item[field]}</Th>
              ))}
            </Tr>
          ))}
        </TBody>
      </Table>
      {loading && <Loader />}
      {canGetNextPage && <div ref={lastRowRef} />}
    </>
  );
};

export default DataTable;
