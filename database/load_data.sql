TRUNCATE TABLE
    user_profile,
    uv_data,
    cancer_mortality_cleaned,
    cancer_incidence_melanoma_trend,
    melanoma_survival_rates,
    melanoma_mortality_rates,
    melanoma_incidence_rates,
    location
RESTART IDENTITY CASCADE;

COPY location (postcode, suburb, state, latitude, longitude)
FROM 'C:/Users/AmanRoy/Documents/GitHub/FIT5120-Team-07-Onboarding-Project/data/final/location_data_cleaned.csv'
DELIMITER ','
CSV HEADER;

COPY uv_data (city, record_date, year, month, daily_max_uv, daily_avg_uv, latitude, longitude, uv_level)
FROM 'C:/Users/AmanRoy/Documents/GitHub/FIT5120-Team-07-Onboarding-Project/data/final/uv_melbourne_final.csv'
DELIMITER ','
CSV HEADER;

COPY cancer_incidence_melanoma_trend (
    year,
    cancer_type,
    population_group,
    age_group,
    count,
    age_specific_rate_per_100000,
    age_standardised_rate_2001_asp,
    age_standardised_rate_2023_pop,
    age_standardised_rate_who,
    age_standardised_rate_segi
)
FROM 'C:/Users/AmanRoy/Documents/GitHub/FIT5120-Team-07-Onboarding-Project/data/final/cancer_incidence_melanoma_trend_cleaned.csv'
DELIMITER ','
CSV HEADER;

COPY cancer_mortality_cleaned (
    year,
    cancer_groupsite,
    sex,
    age_group_years,
    count,
    agespecific_rate_per_100000,
    agestandardised_rate_2001_australian_standard_population_per_100000,
    icd10_codes
)
FROM 'C:/Users/AmanRoy/Documents/GitHub/FIT5120-Team-07-Onboarding-Project/data/final/cancer_mortality_cleaned.csv'
DELIMITER ','
CSV HEADER;

COPY melanoma_incidence_rates (year, persons, males, females)
FROM 'C:/Users/AmanRoy/Documents/GitHub/FIT5120-Team-07-Onboarding-Project/data/final/statistics-melanoma-figure-2-age-standardised-incidence-rates.csv'
DELIMITER ','
CSV HEADER;

COPY melanoma_mortality_rates (year, persons, males, females)
FROM 'C:/Users/AmanRoy/Documents/GitHub/FIT5120-Team-07-Onboarding-Project/data/final/statistics-melanoma-figure-4-age-standardised-mortality-rates.csv'
DELIMITER ','
CSV HEADER;

COPY melanoma_survival_rates (year, persons, males, females)
FROM 'C:/Users/AmanRoy/Documents/GitHub/FIT5120-Team-07-Onboarding-Project/data/final/statistics-melanoma-figure-5-5-year-relative-survival.csv'
DELIMITER ','
CSV HEADER;