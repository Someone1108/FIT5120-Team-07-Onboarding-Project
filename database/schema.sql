DROP TABLE IF EXISTS user_profile CASCADE;
DROP TABLE IF EXISTS uv_data CASCADE;
DROP TABLE IF EXISTS cancer_mortality_cleaned CASCADE;
DROP TABLE IF EXISTS cancer_incidence_melanoma_trend CASCADE;
DROP TABLE IF EXISTS melanoma_survival_rates CASCADE;
DROP TABLE IF EXISTS melanoma_mortality_rates CASCADE;
DROP TABLE IF EXISTS melanoma_incidence_rates CASCADE;
DROP TABLE IF EXISTS location CASCADE;

-- 1) LOCATION
-- Matches: location_data_cleaned.csv
CREATE TABLE location (
    location_id SERIAL PRIMARY KEY,
    postcode VARCHAR(10) NOT NULL,
    suburb VARCHAR(150) NOT NULL,
    state VARCHAR(50) NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6)
);

CREATE INDEX idx_location_postcode ON location(postcode);
CREATE INDEX idx_location_suburb ON location(suburb);

-- 2) USER PROFILE
-- Included because it appears in your ERD, but can stay empty for Iteration 1
CREATE TABLE user_profile (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    age_group VARCHAR(50),
    location_id INT,
    CONSTRAINT fk_user_location
        FOREIGN KEY (location_id)
        REFERENCES location(location_id)
        ON DELETE SET NULL
);

-- 3) UV DATA
-- Matches: uv_melbourne_final.csv
-- Kept practical for your current dataset
CREATE TABLE uv_data (
    uv_id SERIAL PRIMARY KEY,
    location_id INT NULL,
    city VARCHAR(100) NOT NULL,
    record_date DATE NOT NULL,
    year INT NOT NULL,
    month INT NOT NULL,
    daily_max_uv DECIMAL(5,2),
    daily_avg_uv DECIMAL(5,2),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    uv_level VARCHAR(50),
    CONSTRAINT fk_uv_location
        FOREIGN KEY (location_id)
        REFERENCES location(location_id)
        ON DELETE SET NULL
);

CREATE INDEX idx_uv_city ON uv_data(city);
CREATE INDEX idx_uv_record_date ON uv_data(record_date);

-- 4) CANCER INCIDENCE TREND
-- Matches: cancer_incidence_melanoma_trend_cleaned.csv
CREATE TABLE cancer_incidence_melanoma_trend (
    incidence_id SERIAL PRIMARY KEY,
    year INT NOT NULL,
    cancer_type VARCHAR(150),
    population_group VARCHAR(150),
    age_group VARCHAR(100),
    count INT,
    age_specific_rate_per_100000 DECIMAL(10,4),
    age_standardised_rate_2001_asp DECIMAL(10,4),
    age_standardised_rate_2023_pop DECIMAL(10,4),
    age_standardised_rate_who DECIMAL(10,4),
    age_standardised_rate_segi DECIMAL(10,4)
);

CREATE INDEX idx_incidence_year ON cancer_incidence_melanoma_trend(year);

-- 5) CANCER MORTALITY
-- Matches: cancer_mortality_cleaned.csv
CREATE TABLE cancer_mortality_cleaned (
    mortality_id SERIAL PRIMARY KEY,
    year INT NOT NULL,
    cancer_groupsite VARCHAR(150),
    sex VARCHAR(50),
    age_group_years VARCHAR(100),
    count INT,
    agespecific_rate_per_100000 DECIMAL(10,4),
    agestandardised_rate_2001_australian_standard_population_per_100000 DECIMAL(10,4),
    icd10_codes VARCHAR(50)
);

CREATE INDEX idx_mortality_year ON cancer_mortality_cleaned(year);

-- 6) MELANOMA INCIDENCE RATES
-- Matches: statistics-melanoma-figure-2-age-standardised-incidence-rates.csv
CREATE TABLE melanoma_incidence_rates (
    year INT PRIMARY KEY,
    persons DECIMAL(10,4),
    males DECIMAL(10,4),
    females DECIMAL(10,4)
);

-- 7) MELANOMA MORTALITY RATES
-- Matches: statistics-melanoma-figure-4-age-standardised-mortality-rates.csv
CREATE TABLE melanoma_mortality_rates (
    year INT PRIMARY KEY,
    persons DECIMAL(10,4),
    males DECIMAL(10,4),
    females DECIMAL(10,4)
);

-- 8) MELANOMA SURVIVAL RATES
-- Matches: statistics-melanoma-figure-5-5-year-relative-survival.csv
CREATE TABLE melanoma_survival_rates (
    year INT PRIMARY KEY,
    persons DECIMAL(10,4),
    males DECIMAL(10,4),
    females DECIMAL(10,4)
);