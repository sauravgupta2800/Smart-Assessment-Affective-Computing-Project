export const getEmotionalState = (emotionalData) => {
  const { excitement, engagement, relax, interest, stress, focus } =
    emotionalData;

  // if (excitement > 0.5 && engagement > 0.5 && relax > 0.5) {
  //   return "positive";
  // } else if (interest < 0.5 && stress > 0.5) {
  //   return "negative";
  // } else {
  //   return "neutral";
  // }

  // const threshold = 0.5; // Threshold to determine positive or negative sentiment
  // const average =
  //   (engagement + excitement + stress + relax + interest + focus) / 6;

  // if (average >= threshold) {
  //   return "positive";
  // } else if (average <= -threshold) {
  //   return "negative";
  // } else {
  //   return "neutral";
  // }

  if (stress > 0.4) {
    return "negative";
  } else if (stress <= 0.4 && (engagement >= 0.5 || interest >= 0.5)) {
    return "positive";
  } else {
    return "neutral";
  }
};

export const getEmotionalStatePosorNeg = (emotionalData) => {
  const { excitement, engagement, relax, interest, stress, focus } =
    emotionalData;
  const threshold = 0.5; // Threshold to determine positive or negative sentiment
  const average =
    (engagement + excitement + stress + relax + interest + focus) / 6;

  if (average >= threshold) {
    return "positive";
  }
  return "negative";
};
