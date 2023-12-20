import pandas as pd


def convert_csv_to_dict(filepath):

    # read csv into pandas Dataframe
    df = pd.read_csv(filepath, skiprows=0, header=None)

    # Extract header and data rows
    header = df.iloc[0, :].tolist()
    data_rows = df.iloc[1:, :]

    # Convert to dictionary
    result = {}
    for _, row in data_rows.iterrows():
        country = row[0]
        for i in range(1, len(row)):
            year = int(header[i])
            score = int(row[i]) if pd.notna(row[i]) else "NaN"
            if year not in result:
                result[year] = []
            result[year].append(
                {"country": country, "year": year, "score": score})

    return result
