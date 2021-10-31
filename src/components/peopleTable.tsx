import { useEffect, useState } from "react";
import Loader from "./loader";
import { Person } from "../services/swapiService";
import { Table, THead, TBody, Th, Tr } from "./styledTableElements";
import { peopleMapping as mapping } from "../shared/filedToLabelMapping";
import { SwapiService } from "../services/swapiService";
const { getAllPeople } = new SwapiService();

const PeopleTable = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [peopleData, setPeopleData] = useState<Person[]>([]);

  useEffect(() => {
    setLoading(true);
    getAllPeople()
      .then((data) => {
        setLoading(false);
        setPeopleData(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  return (
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
  );
};

export default PeopleTable;
