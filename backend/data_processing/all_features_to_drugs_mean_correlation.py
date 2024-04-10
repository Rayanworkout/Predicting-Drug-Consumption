import pandas as pd
from endpoints.models import Respondent, MeanCorrelationToFeature

from itertools import groupby
from statistics import mean

pd.set_option("future.no_silent_downcasting", True)


def get_all_features_to_drugs_mean():
    """
    Function to get the correlation matrix bof each feature and each drug. It helps show the relationship between the consumption
    of a given drug and the corresponding feature.

    See endpoint /notebooks/2_all_features_to_drugs_mean_correlation.ipynb for more details about the analysis.

    """
    respondents = Respondent.objects.all().values()

    df = pd.DataFrame(respondents)

    features = list(df.columns[1:13])
    drugs = list(df.columns[13:])

    # We need to replace df with numeric values to be able to compute correlations

    age_col = {
        "18-24": -0.95197,
        "25 - 34": -0.07854,
        "35 - 44": 0.49788,
        "45 - 54": 1.09449,
        "55 - 64": 1.82213,
        "65+": 2.59171,
    }
    df["Age"] = df["Age"].replace(age_col)

    gender_col = {"Female": 0.48246, "Male": -0.48246}
    df["Gender"] = df["Gender"].replace(gender_col)

    education_col = {
        "Left School Before 16 years": -2.43591,
        "Left School at 16 years": -1.73790,
        "Left School at 17 years": -1.43719,
        "Left School at 18 years": -1.22751,
        "Some College,No Certificate Or Degree": -0.61113,
        "Professional Certificate/ Diploma": -0.05921,
        "University Degree": 0.45468,
        "Masters Degree": 1.16365,
        "Doctorate Degree": 1.98437,
    }

    df["Education"] = df["Education"].replace(education_col)

    country_col = {
        "Australia": -0.09765,
        "Canada": 0.24923,
        "New Zealand": -0.46841,
        "Other": -0.28519,
        "Republic of Ireland": 0.21128,
        "UK": 0.96082,
        "USA": -0.57009,
    }

    df["Country"] = df["Country"].replace(country_col)

    ethnicity_col = {
        "Asian": -0.50212,
        "Black": -1.10702,
        "Mixed-Black/Asian": 1.90725,
        "Mixed-White/Asian": 0.12600,
        "Mixed-White/Black": -0.22166,
        "Other": 0.11440,
        "White": -0.31685,
    }

    df["Ethnicity"] = df["Ethnicity"].replace(ethnicity_col)

    usage_col = {
        "Never Used": 0,
        "Used over a Decade Ago": 1,
        "Used in Last Decade": 2,
        "Used in Last Year": 3,
        "Used in Last Month": 4,
        "Used in Last Week": 5,
        "Used in Last Day": 6,
    }

    df[drugs] = df[drugs].replace(usage_col)

    correlations = []
    for drug in drugs:
        for feature in features:
            correlations.append((drug, feature, df[drug].corr(df[feature])))

    correlations = sorted(correlations, key=lambda x: x[2], reverse=True)

    correlations.sort(key=lambda x: x[1])

    grouped_data = {}

    # We group data by the second element of the tuple (feature)
    for key, group in groupby(correlations, key=lambda x: x[1]):
        data = list(group)
        grouped_data[key] = {"mean": mean([x[2] for x in data]), "correlations": data}

    # Then we sort the entries depending on the mean of each group
    sorted_grouped_data = sorted(
        grouped_data.items(), key=lambda x: x[1]["mean"], reverse=True
    )

    final_data = {feature: data["mean"] for feature, data in sorted_grouped_data}

    for feature, mean in final_data:
        MeanCorrelationToFeature.objects.create(
            feature=feature, mean_correlation=mean
        )
