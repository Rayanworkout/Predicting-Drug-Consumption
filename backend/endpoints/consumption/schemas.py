from ninja import Schema


class ConsumptionRequest(Schema):
    """
    Request schema for consumption endpoint.
    it defines the fields expected by the endpoint.

    https://django-ninja.dev/guides/request/
    """

    drug: str

    age_range: str = None
    gender: str = None
    ethnicity: str = None
    education: str = None
    country: str = None


class ConsumptionResponse(Schema):
    """
    Response schema for consumption_by_age endpoint.
    it defines the fields returned by the endpoint.

    https://django-ninja.dev/guides/response/
    """

    age_range: str = None
    gender: str = None
    ethnicity: str = None
    education: str = None
    country: str = None

    drug: str
    data: dict = {
        "used in last day": 0,
        "used in last week": 0,
        "used in last year": 0,
        "used in last month": 0,
        "never used": 0,
        "used in last decade": 0,
        "used over a decade ago": 0,
    }


class ConsumptionErrorResponse(Schema):
    """
    Error response schema for consumption endpoints. In case a field is not valid.
    """

    message: str
    allowed_values: list