import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "./loader";
import { Person } from "../services/swapiService";
import { Table, THead, TBody, Th, Tr } from "./styledTableElements";
import { peopleMapping as mapping } from "../shared/filedToLabelMapping";
import { SwapiService } from "../services/swapiService";
const { getPeoplePage } = new SwapiService();

const PeopleTable = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [nextPage, setNextPage] = useState<number>(1);
  const [lastRowInView, setLastRowInView] = useState<boolean>(false);
  const [canGetNextPage, setCanGetNextPage] = useState<boolean>(false);
  const lastRowRef = useRef(null);

  const getFirstPage = useCallback(() => {
    setLoading(true);
    getPeoplePage(1)
      .then(({ data, nextPageExists }) => {
        setPeopleData(data);
        setCanGetNextPage(nextPageExists);
        setNextPage(2);
      })
      .catch((err) => {
        setError(err.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getNextPage = useCallback(() => {
    setLoading(true);
    if (canGetNextPage) {
      getPeoplePage(nextPage)
        .then(({ data, nextPageExists }) => {
          setPeopleData([...peopleData, ...data]);
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
  }, [canGetNextPage, nextPage, peopleData]);

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
              <Th key={field}>{label}</Th>
            ))}
          </Tr>
        </THead>
        <TBody>
          {peopleData.map((person) => (
            <Tr key={person.id}>
              {mapping.map(({ field }) => (
                <Th key={field}>{person[field]}</Th>
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

export default PeopleTable;
