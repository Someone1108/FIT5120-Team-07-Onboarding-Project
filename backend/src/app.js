const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

function getUvLevel(uvIndex) {
  if (uvIndex < 3) return "Low";
  if (uvIndex < 6) return "Moderate";
  if (uvIndex < 8) return "High";
  if (uvIndex < 11) return "Very High";
  return "Extreme";
}

function getUvGuidance(uvIndex) {
  const uvLevel = getUvLevel(uvIndex);

  switch (uvLevel) {
    case "Low":
      return {
        warning_message: "UV is low right now. Basic sun protection is usually enough.",
        actions: ["Wear sunglasses if needed", "Use sunscreen for long outdoor periods"]
      };
    case "Moderate":
      return {
        warning_message: "UV is moderate. Protection is recommended if you are outside.",
        actions: ["Apply sunscreen", "Wear sunglasses", "Seek shade during longer exposure"]
      };
    case "High":
      return {
        warning_message: "UV is high. Your skin can be damaged quickly without protection.",
        actions: ["Apply SPF 30+ sunscreen", "Wear a hat", "Seek shade", "Limit midday sun"]
      };
    case "Very High":
      return {
        warning_message: "UV is very high. Protect yourself as much as possible outdoors.",
        actions: [
          "Apply SPF 30+ sunscreen",
          "Wear a wide-brim hat",
          "Wear sunglasses",
          "Seek shade",
          "Limit outdoor exposure"
        ]
      };
    case "Extreme":
      return {
        warning_message: "UV is extreme. Unprotected skin can burn very quickly.",
        actions: [
          "Avoid direct sun if possible",
          "Apply SPF 30+ sunscreen",
          "Wear protective clothing",
          "Wear a hat and sunglasses",
          "Stay in shade"
        ]
      };
    default:
      return {
        warning_message: "UV information is available.",
        actions: ["Use sun protection"]
      };
  }
}

async function resolveLocation({ lat, lon, suburb, postcode }) {
  if (lat && lon) {
    const latNum = Number(lat);
    const lonNum = Number(lon);

    if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
      throw new Error("Invalid lat/lon values");
    }

    const nearestResult = await pool.query(
      `
      SELECT location_id, suburb, state, postcode, latitude, longitude
      FROM location
      ORDER BY
        POWER(CAST(latitude AS DOUBLE PRECISION) - $1, 2) +
        POWER(CAST(longitude AS DOUBLE PRECISION) - $2, 2) ASC
      LIMIT 1
      `,
      [latNum, lonNum]
    );

    if (nearestResult.rows.length === 0) {
      return {
        location_id: null,
        suburb: "Selected location",
        state: null,
        postcode: null,
        latitude: latNum,
        longitude: lonNum
      };
    }

    const row = nearestResult.rows[0];
    return {
      location_id: row.location_id,
      suburb: row.suburb,
      state: row.state,
      postcode: row.postcode,
      latitude: latNum,
      longitude: lonNum
    };
  }

  if (suburb) {
    const result = await pool.query(
      `
      SELECT location_id, suburb, state, postcode, latitude, longitude
      FROM location
      WHERE LOWER(suburb) = LOWER($1)
      LIMIT 1
      `,
      [suburb]
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  if (postcode) {
    const result = await pool.query(
      `
      SELECT location_id, suburb, state, postcode, latitude, longitude
      FROM location
      WHERE postcode = $1
      LIMIT 1
      `,
      [postcode]
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  return null;
}

async function fetchOpenWeatherUv(lat, lon) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENWEATHER_API_KEY");
  }

  const oneCallUrl =
    `https://api.openweathermap.org/data/3.0/onecall?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${encodeURIComponent(apiKey)}`;

  const weatherUrl =
    `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&units=metric&appid=${encodeURIComponent(apiKey)}`;

  const [oneCallRes, weatherRes] = await Promise.all([
    fetch(oneCallUrl),
    fetch(weatherUrl)
  ]);

  if (!oneCallRes.ok) {
    const text = await oneCallRes.text();
    throw new Error(`One Call failed: ${oneCallRes.status} ${text}`);
  }

  if (!weatherRes.ok) {
    const text = await weatherRes.text();
    throw new Error(`Current Weather failed: ${weatherRes.status} ${text}`);
  }

  const oneCallData = await oneCallRes.json();
  const weatherData = await weatherRes.json();

  const uvIndex = Number(oneCallData?.current?.uvi);

  if (Number.isNaN(uvIndex)) {
    throw new Error("OpenWeather response missing current.uvi");
  }

  const guidance = getUvGuidance(uvIndex);

  return {
    uv_index: uvIndex,
    uv_level: getUvLevel(uvIndex),
    warning_message: guidance.warning_message,
    actions: guidance.actions,
    updated_at: oneCallData?.current?.dt
      ? new Date(oneCallData.current.dt * 1000).toISOString()
      : new Date().toISOString(),
    temperature: weatherData?.main?.temp ?? null,
    source: "openweather"
  };
}

async function fetchDbUvFallback(locationDetails) {
  const { location_id, latitude, longitude, suburb, state } = locationDetails;

  if (location_id) {
    const directResult = await pool.query(
      `
      SELECT
          u.uv_id,
          u.location_id,
          u.city,
          u.record_date,
          u.daily_max_uv,
          u.daily_avg_uv,
          u.uv_level,
          l.suburb,
          l.state,
          l.postcode,
          l.latitude,
          l.longitude
      FROM uv_data u
      LEFT JOIN location l
          ON u.location_id = l.location_id
      WHERE u.location_id = $1
      ORDER BY u.record_date DESC
      LIMIT 1
      `,
      [location_id]
    );

    if (directResult.rows.length > 0) {
      const row = directResult.rows[0];
      const uvIndex = Number(row.daily_max_uv);
      const guidance = getUvGuidance(uvIndex);

      return {
        location: `${row.suburb || row.city}${row.state ? `, ${row.state}` : ""}`,
        uv_index: uvIndex,
        uv_level: row.uv_level || getUvLevel(uvIndex),
        warning_message: guidance.warning_message,
        actions: guidance.actions,
        updated_at: row.record_date ? new Date(row.record_date).toISOString() : null,
        temperature: null,
        source: "database_fallback"
      };
    }
  }

  const nearestResult = await pool.query(
    `
    SELECT
        u.uv_id,
        u.location_id,
        u.city,
        u.record_date,
        u.daily_max_uv,
        u.daily_avg_uv,
        u.uv_level,
        l.suburb,
        l.state,
        l.postcode,
        l.latitude,
        l.longitude
    FROM uv_data u
    LEFT JOIN location l
        ON u.location_id = l.location_id
    WHERE u.latitude IS NOT NULL
      AND u.longitude IS NOT NULL
    ORDER BY
        POWER(CAST(u.latitude AS DOUBLE PRECISION) - $1, 2) +
        POWER(CAST(u.longitude AS DOUBLE PRECISION) - $2, 2) ASC,
        u.record_date DESC
    LIMIT 1
    `,
    [Number(latitude), Number(longitude)]
  );

  if (nearestResult.rows.length > 0) {
    const row = nearestResult.rows[0];
    const uvIndex = Number(row.daily_max_uv);
    const guidance = getUvGuidance(uvIndex);

    return {
      location: `${row.suburb || row.city || suburb}${row.state || state ? `, ${row.state || state}` : ""}`,
      uv_index: uvIndex,
      uv_level: row.uv_level || getUvLevel(uvIndex),
      warning_message: guidance.warning_message,
      actions: guidance.actions,
      updated_at: row.record_date ? new Date(row.record_date).toISOString() : null,
      temperature: null,
      source: "database_fallback"
    };
  }

  return null;
}

app.get("/api/uv/current", async (req, res) => {
  try {
    const { lat, lon, suburb, postcode } = req.query;

    if (!lat && !lon && !suburb && !postcode) {
      return res.status(400).json({
        error: "Missing location input",
        message: "Provide lat/lon or suburb or postcode."
      });
    }

    const locationDetails = await resolveLocation({ lat, lon, suburb, postcode });

    if (!locationDetails) {
      return res.status(404).json({
        error: "Location not found",
        message: "Could not resolve the requested location."
      });
    }

    const locationLabel = `${locationDetails.suburb}${locationDetails.state ? `, ${locationDetails.state}` : ""}`;

    try {
      const liveData = await fetchOpenWeatherUv(
        locationDetails.latitude,
        locationDetails.longitude
      );

      return res.status(200).json({
        location: locationLabel,
        uv_index: liveData.uv_index,
        uv_level: liveData.uv_level,
        warning_message: liveData.warning_message,
        actions: liveData.actions,
        updated_at: liveData.updated_at,
        temperature: liveData.temperature,
        source: liveData.source
      });
    } catch (openWeatherError) {
      console.error("OpenWeather failed, switching to DB fallback:", openWeatherError.message);

      const fallbackData = await fetchDbUvFallback(locationDetails);

      if (fallbackData) {
        return res.status(200).json(fallbackData);
      }

      return res.status(502).json({
        error: "UV data unavailable",
        message: "Live weather failed and no fallback UV data was found."
      });
    }
  } catch (error) {
    console.error("GET /api/uv/current error:", error);

    return res.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong while fetching UV data."
    });
  }
});

app.get("/api/locations", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT location_id, suburb, state, postcode, latitude, longitude
      FROM location
      ORDER BY suburb ASC
      LIMIT 100
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET /api/locations error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong while fetching locations."
    });
  }
});

app.get("/api/cancer/incidence", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        year,
        count,
        age_group,
        cancer_type,
        population_group,
        age_specific_rate_per_100000,
        age_standardised_rate_2001_asp,
        age_standardised_rate_2023_pop,
        age_standardised_rate_who,
        age_standardised_rate_segi
      FROM cancer_incidence_melanoma_trend
      ORDER BY year ASC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET /api/cancer/incidence error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong while fetching incidence data."
    });
  }
});

app.get("/api/cancer/mortality", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        year,
        cancer_groupsite,
        sex,
        age_group_years,
        count,
        agespecific_rate_per_100000,
        agestandardised_rate_2001_australian_standard_population_per_10,
        icd10_codes
      FROM cancer_mortality_cleaned
      ORDER BY year ASC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET /api/cancer/mortality error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong while fetching mortality data."
    });
  }
});

app.get("/api/cancer/survival", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        year_range,
        persons,
        males,
        females
      FROM melanoma_survival_rates
      ORDER BY year_range ASC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET /api/cancer/survival error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong while fetching survival data."
    });
  }
});

app.get("/api/uv/trend", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        record_date,
        city,
        daily_max_uv,
        daily_avg_uv,
        uv_level,
        latitude,
        longitude
      FROM uv_data
      ORDER BY record_date ASC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET /api/uv/trend error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong while fetching UV trend data."
    });
  }
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});