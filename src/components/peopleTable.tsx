import { useCallback, useEffect, useState } from "react";
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

  const getNextPage = useCallback(() => {
    if (loading) {
      getPeoplePage(nextPage)
        .then(({ data, nextPageExists }) => {
          setPeopleData([...peopleData, ...data]);
          console.log("Next page exists:", nextPageExists);
          setNextPage(nextPageExists ? nextPage + 1 : -1);
        })
        .catch((err) => {
          setError(err.toString());
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading, nextPage, peopleData]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    setLoading(true);
    getNextPage();
    return document.removeEventListener("scroll", () => scrollHandler);
  }, []);

  useEffect(getNextPage, [loading]);

  const scrollHandler = (e: Event) => {
    setTimeout(() => {
      const target = e.target as Document;
      if (
        nextPage > 0 &&
        target.documentElement.scrollHeight -
          (target.documentElement.scrollTop + window.innerHeight) <
          100
      ) {
        setLoading(true);
      }
    }, 0);
  };

  // if (loading) return <Loader />;
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
    </>
  );
};

export default PeopleTable;
