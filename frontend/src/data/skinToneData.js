const skinToneData = [
  {
    id: 1,
    type: "Type I",
    name: "Very Fair",
    color: "#f6dcc7",
    sensitivity: "Very high UV sensitivity",
    absorption:
      "Lower melanin means this skin type has less natural UV protection and burns very quickly.",
    risk:
      "This skin tone is highly sensitive to UV radiation, especially during high and very high UV periods.",
    advice:
      "Use SPF 50+, wear a hat and sunglasses, seek shade early, and avoid long direct sun exposure during midday hours."
  },
  {
    id: 2,
    type: "Type II",
    name: "Fair",
    color: "#ecccad",
    sensitivity: "High UV sensitivity",
    absorption:
      "This skin type has low natural UV protection and can still burn quickly on strong UV days.",
    risk:
      "UV exposure can damage the skin even after a short time outdoors when UV levels are high.",
    advice:
      "Use SPF 30+ to 50+, reapply sunscreen every 2 hours, and reduce direct sun exposure during peak UV times."
  },
  {
    id: 3,
    type: "Type III",
    name: "Medium",
    color: "#d2a675",
    sensitivity: "Moderate UV sensitivity",
    absorption:
      "This skin tone has more melanin than fair skin, but UV damage can still happen during prolonged exposure.",
    risk:
      "The risk of visible burning may be lower, but high UV still causes long-term skin damage.",
    advice:
      "Use SPF 30+, sunglasses, and shade during high UV periods, especially in the middle of the day."
  },
  {
    id: 4,
    type: "Type IV",
    name: "Olive",
    color: "#b58660",
    sensitivity: "Moderate to lower visible burning risk",
    absorption:
      "This skin tone has more natural melanin protection, but UV exposure can still damage skin over time.",
    risk:
      "It may not burn as quickly as lighter skin tones, but that does not remove UV risk.",
    advice:
      "Use sunscreen, especially on high UV days, and wear protective accessories like hats and sunglasses."
  },
  {
    id: 5,
    type: "Type V",
    name: "Brown",
    color: "#8b5f4a",
    sensitivity: "Lower visible burning risk",
    absorption:
      "Higher melanin provides more natural protection, but UV radiation can still cause damage and increase long-term health risks.",
    risk:
      "The risk of sunburn may be lower, but UV damage and skin cancer risk are not zero.",
    advice:
      "Use SPF 30+, seek shade when UV is high, and do not assume darker skin removes the need for protection."
  },
  {
    id: 6,
    type: "Type VI",
    name: "Dark",
    color: "#5b402d",
    sensitivity: "Lower visible burning risk, but still affected by UV",
    absorption:
      "This skin tone has the highest melanin level in this selector, which gives more natural UV protection than lighter skin tones.",
    risk:
      "Although visible burning is less common, UV exposure can still contribute to long-term skin damage.",
    advice:
      "Use sunscreen, sunglasses, and shade during extreme UV periods. Protection is still recommended."
  }
];

export default skinToneData;