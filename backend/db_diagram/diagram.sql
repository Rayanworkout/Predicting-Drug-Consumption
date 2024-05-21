CREATE TABLE `Respondent` (
  `id` pk,
  `age` text,
  `gender` text,
  `education` texte,
  `country` texte,
  `ethnicity` texte,
  `neuroticism` float,
  `extraversion` float,
  `openness_to_experience` float,
  `agreeableness` float,
  `conscientiousness` float,
  `impulsive` float,
  `sensation_seeking` float,
  `alcohol` text,
  `amphet` text,
  `amyl` text,
  `benzos` text,
  `caff` text,
  `cannabis` text,
  `choc` text,
  `coke` text,
  `crack` text,
  `ecstasy` text,
  `heroin` text,
  `ketamine` text,
  `legalh` text,
  `lsd` text,
  `meth` text,
  `mushrooms` text,
  `nicotine` text,
  `vsa` text,
  `semer` text
);

CREATE TABLE `CorrelationToDrug` (
  `id` pk,
  `feature` text,
  `drug` text,
  `correlation` float
);

CREATE TABLE `MeanCorrelationToFeature` (
  `id` pk,
  `feature` text,
  `mean_correlation` float
);
