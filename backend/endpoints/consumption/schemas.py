from ninja import Schema


####################################################################################################
# CONSUMPTION BY AGE
####################################################################################################


class ConsumptionByAgeResponse(Schema):
    """
    Response schema for consumption_by_age endpoint.
    it defines the fields returned by the endpoint.

    https://django-ninja.dev/guides/response/
    """

    age_range: str = None
    drug: str = None
    data: dict = {
        "used in last day": 0,
        "used in last week": 0,
        "used in last year": 0,
        "used in last month": 0,
        "never used": 0,
        "used in last decade": 0,
        "used over a decade ago": 0,
    }


class ConsumptionByAgeErrorResponse(Schema):
    """
    Error response schema for consumption_by_age endpoint. In case age_range or drug is not valid.
    """

    message: str


class ConsumptionByAgeRequest(Schema):
    """
    Request schema for consumption_by_age endpoint.
    it defines the fields expected by the endpoint.

    https://django-ninja.dev/guides/request/
    """

    age_range: str = "18-24"
    drug: str = "meth"
