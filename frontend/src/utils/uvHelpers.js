export function getUVSeverity(uv) {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
}

export function getUVAdvice(uv) {
  if (uv <= 2) {
    return "Low UV risk. Basic sun protection is enough for most people.";
  }
  if (uv <= 5) {
    return "Moderate UV levels. Sun protection is recommended during midday hours.";
  }
  if (uv <= 7) {
    return "High UV levels. Protection is needed during the middle of the day.";
  }
  if (uv <= 10) {
    return "Very high UV levels. Seek shade, wear sunscreen, and limit sun exposure.";
  }
  return "Extreme UV levels. Avoid direct sun exposure and take full protective measures.";
}

export function getUVActions(uv) {
  if (uv <= 2) {
    return [
      "Wear sunglasses if outdoors for long periods",
      "Check UV later in the day if spending more time outside"
    ];
  }

  if (uv <= 5) {
    return [
      "Apply SPF 30+ sunscreen",
      "Wear sunglasses",
      "Stay aware of peak UV periods"
    ];
  }

  if (uv <= 7) {
    return [
      "Apply SPF 30+ sunscreen",
      "Wear a wide-brim hat",
      "Wear sunglasses",
      "Seek shade during midday hours"
    ];
  }

  if (uv <= 10) {
    return [
      "Apply SPF 30+ sunscreen",
      "Wear sunglasses and a wide-brim hat",
      "Seek shade during midday hours",
      "Wear protective clothing if possible"
    ];
  }

  return [
    "Apply high-protection sunscreen",
    "Avoid direct midday sun",
    "Wear sunglasses, a hat, and protective clothing",
    "Stay indoors if possible during extreme UV periods"
  ];
}