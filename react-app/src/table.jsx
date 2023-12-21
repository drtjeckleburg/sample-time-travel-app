import { useEffect, useState, useCallback, useRef } from "react";
const apiKey = import.meta.env.VITE_API_KEY;
const ledger = import.meta.env.VITE_LEDGER;
import axios from "axios";

function GenerateQueryBody(ledger, currentValue) {
  return {
    from: ledger,
    where: {
      "@id": "?subject",
      country: "?country",
      score: "?score",
      year: "?year",
    },
    select: {
      "?subject": ["country", "score", "year"],
    },
    opts: {
      orderBy: ["ASC", "?score"],
    },
    t: currentValue,
  };
}

const issueQuery = (queryBody, apiKey) => {
  return axios.post("http://localhost:58090/fluree/query", queryBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
      Accept: "text/plain",
    },
  });
};

export const TableComponent = ({ sliderValue }) => {
  const timeSliderRef = useRef(); //certain reference point
  const [entities, setEntities] = useState([]);
  const [selected, setSelected] = useState(null);

  const refreshData = useCallback(
    () =>
      issueQuery(GenerateQueryBody(ledger, sliderValue), apiKey)
        .then((response) => {
          setEntities(response.data);
          setSelected(response.data[0]); //actually sets state value
        })
        .catch((error) => {
          console.log(error);
        }),
    [setEntities, setSelected, sliderValue]
  );

  useEffect(() => {
    refreshData();
  }, [sliderValue]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Who is Getting the Most out of this Mortal Coil?
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Average Happiness by country as of 2022
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Country
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Score
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Year
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {
                    // eslint-disable-next-line react/prop-types
                    entities.map((entity) => (
                      <tr key={entity["@id"]}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {entity["country"]}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {entity["score"]}
                        </td>
                        {/* <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {entity.country}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {entity.score}
                          </td> */}
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;

// utilities files exporting functions -> export individually to import individually
