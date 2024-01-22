from package.clean_data import convert_csv_to_dict
from package.nexus_api import transact_to_nexus

file_path = 'data/hapiscore_whr.csv'
dataset_id = "YOUR DATASET ID HERE"
api_key = "YOUR API KEY HERE"
url = "http://localhost:58090/fluree/transact"
# url = "http://data.flur.ee/fluree/transact"

# read clean data from config file
data_dict = convert_csv_to_dict(file_path)

# invoke function to hit nexus UI
transact_to_nexus(data_dict, dataset_id, api_key, url)
