import os
import pandas as pd

from api.models import Respondent


class Parser:
    """
    This class is meant to parse a csv file and save the data to the database. It must only be used one time when deploying.
    When the data is saved to the database, the csv file is no longer needed and this class should not be used again.

    Dataset link: https://www.kaggle.com/datasets/mexwell/drug-consumption-classification/data

    Methods:
            __parse_csv: Parse the csv file and return a pandas DataFrame.

            __generate_clean_dataframe: Cleans the dataframe by making some features more readable, then saves the cleaned data to a new csv file.
                - https://www.kaggle.com/code/mexwell/starter-notebook-convert-column-values

            csv_to_database: Saves the data to the database.

    """

    def __init__(self, file_path: str = "drug_consumption.csv") -> None:

        self.BASE_DIR = os.path.dirname(os.path.dirname(__file__))

        file_path = os.path.join(self.BASE_DIR, "csv_parser", file_path)

        if not os.path.exists(file_path):
            raise FileNotFoundError(
                f"File {file_path} not found, please place your csv file in the same directory as the script."
            )

        self.file_path = file_path

    def __parse_csv(self) -> pd.DataFrame:
        """Parse the csv file and return a pandas DataFrame.

        https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html
        """

        return pd.read_csv(self.file_path)

    def __generate_clean_dataframe(self, data: pd.DataFrame) -> pd.DataFrame:
        """
        Cleans the dataframe and make some features more readable, according to the starter notebook:

        https://www.kaggle.com/code/mexwell/starter-notebook-convert-column-values

        """

        if os.path.exists("csv_parser/drug_consumption_cleaned.csv"):
            print("Data already cleaned, using cleaned csv file.")
            return pd.read_csv("csv_parser/drug_consumption_cleaned.csv")

        age_col = {
            -0.95197: "18-24",
            -0.07854: "25 - 34",
            0.49788: "35 - 44",
            1.09449: "45 - 54",
            1.82213: "55 - 64",
            2.59171: "65+",
        }
        data["Age"] = data["Age"].replace(age_col)

        gender_col = {0.48246: "Female", -0.48246: "Male"}
        data["Gender"] = data["Gender"].replace(gender_col)

        education_col = {
            -2.43591: "Left School Before 16 years",
            -1.73790: "Left School at 16 years",
            -1.43719: "Left School at 17 years",
            -1.22751: "Left School at 18 years",
            -0.61113: "Some College,No Certificate Or Degree",
            -0.05921: "Professional Certificate/ Diploma",
            0.45468: "University Degree",
            1.16365: "Masters Degree",
            1.98437: "Doctorate Degree",
        }
        data["Education"] = data["Education"].replace(education_col)

        country_col = {
            -0.09765: "Australia",
            0.24923: "Canada",
            -0.46841: "New Zealand",
            -0.28519: "Other",
            0.21128: "Republic of Ireland",
            0.96082: "UK",
            -0.57009: "USA",
        }

        data["Country"] = data["Country"].replace(country_col)

        ethnicity_col = {
            -0.50212: "Asian",
            -1.10702: "Black",
            1.90725: "Mixed-Black/Asian",
            0.12600: "Mixed-White/Asian",
            -0.22166: "Mixed-White/Black",
            0.11440: "Other",
            -0.31685: "White",
        }
        data["Ethnicity"] = data["Ethnicity"].replace(ethnicity_col)

        usage_col = {
            "CL0": "Never Used",
            "CL1": "Used over a Decade Ago",
            "CL2": "Used in Last Decade",
            "CL3": "Used in Last Year",
            "CL4": "Used in Last Month",
            "CL5": "Used in Last Week",
            "CL6": "Used in Last Day",
        }
        data["Alcohol"] = data["Alcohol"].replace(usage_col)
        data["Amphet"] = data["Amphet"].replace(usage_col)
        data["Amyl"] = data["Amyl"].replace(usage_col)
        data["Benzos"] = data["Benzos"].replace(usage_col)
        data["Caff"] = data["Caff"].replace(usage_col)
        data["Cannabis"] = data["Cannabis"].replace(usage_col)
        data["Choc"] = data["Choc"].replace(usage_col)
        data["Coke"] = data["Coke"].replace(usage_col)
        data["Crack"] = data["Crack"].replace(usage_col)
        data["Ecstasy"] = data["Ecstasy"].replace(usage_col)
        data["Heroin"] = data["Heroin"].replace(usage_col)
        data["Ketamine"] = data["Ketamine"].replace(usage_col)
        data["Legalh"] = data["Legalh"].replace(usage_col)
        data["LSD"] = data["LSD"].replace(usage_col)
        data["Meth"] = data["Meth"].replace(usage_col)
        data["Mushrooms"] = data["Mushrooms"].replace(usage_col)
        data["Nicotine"] = data["Nicotine"].replace(usage_col)
        data["Semer"] = data["Semer"].replace(usage_col)
        data["VSA"] = data["VSA"].replace(usage_col)

        cleaned_date_path = os.path.join(
            self.BASE_DIR, "csv_parser", "drug_consumption_cleaned.csv"
        )
        data.to_csv(cleaned_date_path, index=False)

        return data

    def csv_to_database(self) -> None:
        """Saves the data to the database."""

        data = self.__parse_csv()
        cleaned_df = self.__generate_clean_dataframe(data)

        for _, row in cleaned_df.iterrows():
            Respondent.objects.create(
                age=row["Age"]
                .replace(" ", "")
                .lower(),  # there is a space in the age column for all fields except for "18-24", so I standardized the format
                gender=row["Gender"].lower(),
                education=row["Education"].lower(),
                country=row["Country"].lower(),
                ethnicity=row["Ethnicity"].lower(),
                nscore=row["Nscore"],
                escore=row["Escore"],
                oscore=row["Oscore"],
                ascore=row["Ascore"],
                cscore=row["Cscore"],
                impulsive=row["Impulsive"],
                ss=row["SS"],
                alcohol=row["Alcohol"].lower(),
                amphet=row["Amphet"].lower(),
                amyl=row["Amyl"].lower(),
                benzos=row["Benzos"].lower(),
                caff=row["Caff"].lower(),
                cannabis=row["Cannabis"].lower(),
                choc=row["Choc"].lower(),
                coke=row["Coke"].lower(),
                crack=row["Crack"].lower(),
                ecstasy=row["Ecstasy"].lower(),
                heroin=row["Heroin"].lower(),
                ketamine=row["Ketamine"].lower(),
                legalh=row["Legalh"].lower(),
                lsd=row["LSD"].lower(),
                meth=row["Meth"].lower(),
                mushrooms=row["Mushrooms"].lower(),
                nicotine=row["Nicotine"].lower(),
                semer=row["Semer"].lower(),
                vsa=row["VSA"].lower(),
            )

        print("Data successfully saved to the database.")
