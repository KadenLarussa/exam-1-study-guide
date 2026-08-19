export type MedMathQuestion = {
  id: string;
  type: "IV push" | "Pump rate" | "Drip rate";
  prompt: (minutes: number) => string;
  answer: (minutes: number) => number;
  unit: string;
  hint: string;
  equation: string[];
  formula: (minutes: number) => string;
  randomTimes?: number[];
};

export type ActiveMathQuestion = MedMathQuestion & { minutes: number; formulaPieces: string[] };

const round = (value: number, decimals = 1) => Math.round(value * 10 ** decimals) / 10 ** decimals;

export const medMathQuestions: MedMathQuestion[] = [
  {
    id: "push-weight-mg",
    type: "IV push",
    prompt: () => "An 82 kg patient is ordered 0.1 mg/kg of a medication. The vial concentration is 2 mg/mL. How many mL will you draw up?",
    answer: () => 4.1,
    unit: "mL",
    hint: "Find the total ordered dose first, then convert milligrams to milliliters using the vial concentration.",
    equation: ["weight", "×", "ordered dose per kg", "÷", "concentration", "=", "mL to give"],
    formula: () => "82 kg × 0.1 mg/kg = 8.2 mg; 8.2 mg ÷ 2 mg/mL = 4.1 mL.",
  },
  {
    id: "push-weight-mcg",
    type: "IV push",
    prompt: () => "A 75 kg patient is ordered 1.5 mcg/kg of a medication. The concentration is 50 mcg/mL. How many mL will you administer?",
    answer: () => 2.25,
    unit: "mL",
    hint: "Keep the dose in micrograms all the way through, then divide by micrograms per mL.",
    equation: ["weight", "×", "ordered dose per kg", "÷", "concentration", "=", "mL to give"],
    formula: () => "75 kg × 1.5 mcg/kg = 112.5 mcg; 112.5 mcg ÷ 50 mcg/mL = 2.25 mL.",
  },
  {
    id: "push-fixed-dose",
    type: "IV push",
    prompt: () => "The ordered dose is 6 mg. The medication concentration is 2 mg/mL. How many mL will you administer?",
    answer: () => 3,
    unit: "mL",
    hint: "The concentration tells you how many milligrams fit in one milliliter.",
    equation: ["ordered dose", "÷", "concentration", "=", "mL to give"],
    formula: () => "6 mg ÷ 2 mg/mL = 3 mL.",
  },
  {
    id: "pump-concentration",
    type: "Pump rate",
    prompt: () => "A medication bag contains 400 mg in 250 mL. The order is 5 mg/min. What pump setting in mL/hr delivers that dose?",
    answer: () => 187.5,
    unit: "mL/hr",
    hint: "Convert the bag into mg/mL, calculate how many mL are needed each minute, then convert minutes to an hour.",
    equation: ["ordered mg/min", "÷", "bag concentration (mg/mL)", "×", "60", "=", "mL/hr"],
    formula: () => "400 mg ÷ 250 mL = 1.6 mg/mL; 5 mg/min ÷ 1.6 mg/mL = 3.125 mL/min; × 60 = 187.5 mL/hr.",
  },
  {
    id: "pump-hang",
    type: "Pump rate",
    prompt: (minutes) => `A 500 mL bag is to infuse evenly over ${minutes} minutes. What pump setting in mL/hr is needed?`,
    answer: (minutes) => round(500 / (minutes / 60)),
    unit: "mL/hr",
    hint: "For a pump, turn the ordered minutes into the fraction of an hour first.",
    equation: ["volume", "÷", "time in hours", "=", "mL/hr"],
    formula: (minutes) => `500 mL ÷ (${minutes} min ÷ 60 min/hr) = ${round(500 / (minutes / 60))} mL/hr.`,
    randomTimes: [30, 45, 60],
  },
  {
    id: "drip-macro",
    type: "Drip rate",
    prompt: (minutes) => `A 500 mL bag is to infuse over ${minutes} minutes using 10 gtt/mL tubing. Round to the nearest whole drop: what is the drip rate in gtt/min?`,
    answer: (minutes) => Math.round((500 * 10) / minutes),
    unit: "gtt/min",
    hint: "A gravity rate uses volume × drop factor ÷ time in minutes.",
    equation: ["volume", "×", "drop factor", "÷", "time in minutes", "=", "gtt/min"],
    formula: (minutes) => `(500 mL × 10 gtt/mL) ÷ ${minutes} min = ${Math.round((500 * 10) / minutes)} gtt/min.`,
    randomTimes: [30, 45, 60],
  },
  {
    id: "drip-micro",
    type: "Drip rate",
    prompt: (minutes) => `A 250 mL bag is to infuse over ${minutes} minutes using 60 gtt/mL tubing. Round to the nearest whole drop: what is the drip rate in gtt/min?`,
    answer: (minutes) => Math.round((250 * 60) / minutes),
    unit: "gtt/min",
    hint: "With microdrip tubing, do not forget that the drop factor is 60 gtt/mL.",
    equation: ["volume", "×", "drop factor", "÷", "time in minutes", "=", "gtt/min"],
    formula: (minutes) => `(250 mL × 60 gtt/mL) ÷ ${minutes} min = ${Math.round((250 * 60) / minutes)} gtt/min.`,
    randomTimes: [45, 60],
  },
  {
    id: "drip-large-bag",
    type: "Drip rate",
    prompt: (minutes) => `A 1,000 mL bag is to infuse over ${minutes} minutes using 15 gtt/mL tubing. Round to the nearest whole drop: what is the drip rate in gtt/min?`,
    answer: (minutes) => Math.round((1000 * 15) / minutes),
    unit: "gtt/min",
    hint: "Use the gravity-drip formula and make sure the time stays in minutes, not hours.",
    equation: ["volume", "×", "drop factor", "÷", "time in minutes", "=", "gtt/min"],
    formula: (minutes) => `(1,000 mL × 15 gtt/mL) ÷ ${minutes} min = ${Math.round((1000 * 15) / minutes)} gtt/min.`,
    randomTimes: [45, 60],
  },
];

export const buildMedMathSet = (randomTimes: boolean): ActiveMathQuestion[] =>
  medMathQuestions.map((question) => {
    const choices = question.randomTimes ?? [60];
    const minutes = randomTimes ? choices[Math.floor(Math.random() * choices.length)] : 60;
    return { ...question, minutes, formulaPieces: [...question.equation].sort(() => Math.random() - 0.5) };
  }).sort(() => Math.random() - 0.5);
