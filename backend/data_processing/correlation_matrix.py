import pandas as pd

from endpoints.models import Respondent


def get_correlation_matrix():
    respondents = Respondent.objects.all().values()

    df = pd.DataFrame(respondents)

    print(df.head())
