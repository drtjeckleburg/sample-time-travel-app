from package.clean_data import convert_csv_to_dict
from package.nexus_api import transact_to_nexus

# TODO import config vals from .env? figure out how the fuck that works
file_path = 'data/hapiscore_whr.csv'
dataset_id = "test2"
api_key = "FQse8miotpUMcU8NKT5QPmJ1cSQe3VBNZrlOBb8_bs0WO9IWUj-pOHu8CVFbs-ZMFlQqSQpYMRu5ts_i_KixWg"
url = "http://localhost:58090/fluree/transact"
# url = "http://data.flur.ee/fluree/transact"

# read clean data from config file
data_dict = convert_csv_to_dict(file_path)

# invoke function to hit nexus UI
transact_to_nexus(data_dict, dataset_id, api_key, url)
