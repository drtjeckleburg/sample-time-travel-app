import axios from "axios";

export const query = "http://localhost:58090/fluree/query";

export const transact = "http://localhost:58090/fluree/transact";

export const history = "http://localhost:58090/fluree/history";

export function TableQuery(ledger, currentValue) {
  /*
    Query for each country & score in World Happiness dataset, only return values where year == toggle value in slider (this is currentValue)
     */
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

export function HitAPI(queryBody, apiKey, api) {
  return axios.post(api, queryBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
      Accept: "text/plain",
    },
  });
}

export function ToggleDimensions(ledger) {
  return {
    "@context": {
      f: "https://ns.flur.ee/ledger#",
    },
    from: ledger,
    t: { at: "latest" },
    "commit-details": true,
  };
}
