const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

function getUvLevel(uvIndex) {
  if (uvIndex < 3) return 'Low';
  if (uvIndex < 6) return 'Moderate';
  if (uvIndex < 8) return 'High';
  if (uvIndex < 11) return 'Very High';
  return 'Extreme';
}

function getUvGuidance(uvIndex) {
  const uvLevel = getUvLevel(uvIndex);

  switch (uvLevel) {
    case 'Low':
      return {
        warning_message: 'UV is low right now. Basic sun protection is usually enough.',
        actions: ['Wear sunglasses', 'Use sunscreen if staying outdoors for long periods']
      };

    case 'Moderate':
      return {
        warning_message: 'UV is moderate. Protection is recommended if you are outside.',
        actions: ['Apply sunscreen', 'Wear sunglasses', 'Seek shade during longer exposure']
      };

    case 'High':
      return {
        warning_message: 'UV is high. Your skin can be damaged quickly, so protect yourself.',
        actions: ['Apply sunscreen', 'Wear a hat', 'Seek shade', 'Limit midday sun exposure']
      };

    case 'Very High':
      return {
        warning_message: 'UV is very high today. Seek shade and protect your skin carefully.',
        actions: ['Apply sunscreen', 'Wear a hat', 'Wear sunglasses', 'Limit midday sun', 'Stay in shade']
      };

    case 'Extreme':
      return {
        warning_message: 'UV is extreme. Unprotected skin can burn very quickly.',
        actions: ['Avoid direct sun', 'Apply sunscreen', 'Wear a hat', 'Wear sunglasses', 'Stay in shade']
      };

    default:
      return {
        warning_message: 'Use sun protection when outdoors.',
        actions: ['Apply sunscreen', 'Wear a hat']
      };
  }
}

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.get('/api/locations', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT location_id, suburb, state, postcode, latitude, longitude
      FROM location
      LIMIT 20
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/uv/current', async (req, res) => {
  const { city, lat, lon } = req.query;

  try {
    let result;

    if (lat && lon) {
      result = await pool.query(
        `
        SELECT
          city,
          record_date,
          daily_max_uv,
          daily_avg_uv,
          latitude,
          longitude,
          uv_level
        FROM uv_data
        WHERE latitude IS NOT NULL
          AND longitude IS NOT NULL
        ORDER BY
          ((latitude - $1::float) * (latitude - $1::float) +
           (longitude - $2::float) * (longitude - $2::float)) ASC,
          record_date DESC
        LIMIT 1
        `,
        [lat, lon]
      );
    } else if (city) {
      result = await pool.query(
        `
        SELECT
          city,
          record_date,
          daily_max_uv,
          daily_avg_uv,
          latitude,
          longitude,
          uv_level
        FROM uv_data
        WHERE LOWER(city) = LOWER($1)
        ORDER BY record_date DESC
        LIMIT 1
        `,
        [city]
      );
    } else {
      return res.status(400).json({
        error: 'Provide either ?city=... or ?lat=...&lon=...'
      });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'No UV data found for the requested location'
      });
    }

    const row = result.rows[0];
    const uvIndex = Number(row.daily_max_uv ?? row.daily_avg_uv ?? 0);
    const guidance = getUvGuidance(uvIndex);

    res.json({
      location: row.city,
      uv_index: Number(uvIndex),
      uv_level: row.uv_level || getUvLevel(uvIndex),
      warning_message: guidance.warning_message,
      actions: guidance.actions,
      updated_at: row.record_date,
      latitude: row.latitude !== null ? Number(row.latitude) : null,
      longitude: row.longitude !== null ? Number(row.longitude) : null,
      daily_avg_uv: row.daily_avg_uv !== null ? Number(row.daily_avg_uv) : null
    });
  } catch (error) {
    console.error('Error fetching UV data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});