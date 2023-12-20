import requests
import time


def transact_to_nexus(data_dict, dataset_id, api_key, url):

    # Iterate through values in data dictionary and transact years in distinct commits
    for year, entries in data_dict.items():
        print(f"Year {year}:")

        # transaction body
        transaction = {
            "@context": {},
            "ledger": dataset_id,
            "where": {
                "@id": "?subject",
                "country": "?country",
                "?p": "?o"
            },
            "delete": {
                "@id": "?s",
                "?p": "?o"
            },
            "insert": data_dict[year],
        }

        headers = {
            "Content-Type": "application/json",
            "Authorization": api_key,
            'Accept': 'text/plain'
        }

        response = requests.post(url, headers=headers,
                                 json=transaction)
        data = response.json()
        print(data)
        time.sleep(5)
