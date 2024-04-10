from ninja import Schema

class SubstanceSchema(Schema):
    alcohol: float
    amphet: float
    amyl: float
    benzos: float
    caff: float
    cannabis: float
    choc: float
    coke: float
    crack: float
    ecstasy: float
    heroin: float
    ketamine: float
    legalh: float
    lsd: float
    meth: float
    mushrooms: float
    nicotine: float
    semer: float
    vsa: float

class CorrelationResponse(Schema):
    """
    Response schema for correlation endpoint.
    It defines the fields returned by the endpoint.

    For each personality trait, there is a dictionary with the drug name as the key and the correlation value as the value.

    https://django-ninja.dev/guides/response/
    """
    neuroticism: SubstanceSchema
    extraversion: SubstanceSchema
    openness_to_experience: SubstanceSchema
    agreeableness: SubstanceSchema
    conscientiousness: SubstanceSchema
    impulsive: SubstanceSchema
    sensation_seeking: SubstanceSchema