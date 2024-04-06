from ninja import Schema


class ConsumptionErrorResponse(Schema):
    """
    Error response schema for consumption endpoints. In case a field is not valid.
    """

    message: str
    allowed_values: list

####################################################################################################
# CONSUMPTION BY AGE
####################################################################################################


class ConsumptionByAgeRequest(Schema):
    """
    Request schema for consumption_by_age endpoint.
    it defines the fields expected by the endpoint.

    https://django-ninja.dev/guides/request/
    """

    age_range: str = "18-24"
    drug: str = "meth"


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



####################################################################################################
# CONSUMPTION BY GENDER
####################################################################################################


class ConsumptionByGenderRequest(Schema):
    """
    Request schema for consumption by gender endpoint.
    it defines the fields expected by the endpoint.

    https://django-ninja.dev/guides/request/
    """

    gender: str = "male"
    drug: str = "meth"


class ConsumptionByGenderResponse(Schema):
    """
    Response schema for consumption_by_age endpoint.
    it defines the fields returned by the endpoint.

    https://django-ninja.dev/guides/response/
    """

    gender: str = None
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
