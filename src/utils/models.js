import { legend, colors, labels, generateLabels, dataShown } from "./utils.js";

export function sir({
  days = 30,
  susceptible = 1000,
  infectious = 100,
  recovered = 0,
  alpha = 0.00035,
  gamma = 0.12,
}) {
  let R0,
    S = [],
    I = [],
    R = [],
    time = [];

  const deltaT = 1;

  S[0] = susceptible - infectious;
  I[0] = infectious;
  R[0] = recovered;

  R0 = (alpha * S[0]) / gamma;

  time[0] = 0;

  for (let i = 1; i < days; i++) {
    time[i] = i;
    S[i] = S[i - 1] + -alpha * S[i - 1] * I[i - 1] * deltaT;
    I[i] = I[i - 1] + (alpha * S[i - 1] * I[i - 1] - gamma * I[i - 1]) * deltaT;
    R[i] = R[i - 1] + gamma * I[i - 1] * deltaT;
  }

  const data = {
    chart: {
      labels: labels(time),
      datasets: [
        {
          data: dataShown(S),
          color: colors.susceptible,
        },
        {
          data: dataShown(I),
          color: colors.infectious,
        },
        {
          data: dataShown(R),
          color: colors.recovered,
        },
      ],
      legend: legend.sir,
    },
    r0: R0,
  };

  return data;
}

export function siro({
  days = 30,
  population = 209300000,
  infectious = 1,
  recovered = 0,
  death = 0,
  alpha = 0.5,
  gamma = 0.14,
  beta = 0.065,
  start = 0
}) {
  let R0,
    step = 1,
    S = [],
    I = [],
    R = [],
    D = [];

  const deltaT = 1 / step;

  D[0] = death;
  R[0] = recovered;
  I[0] = infectious;
  S[0] = population - infectious - death;

  R0 = alpha / (gamma + beta);

  console.log('dia: '+days);

  for (let i = 1; i < days * step; i++) {
    S[i] = S[i - 1] + -(alpha / population) * S[i - 1] * I[i - 1] * deltaT;
    I[i] =
      I[i - 1] +
      ((alpha / population) * S[i - 1] * I[i - 1] - (gamma + beta) * I[i - 1]) *
        deltaT;
    R[i] = R[i - 1] + gamma * I[i - 1] * deltaT;
    D[i] = D[i - 1] + beta * I[i - 1] * deltaT;
  }
  const data = {
    chart: {
      labels: generateLabels(days),
      datasets: [
        {
          data: dataShown(S, start),
          color: colors.susceptible,
        },
        {
          data: dataShown(I, start),
          color: colors.infectious,
        },
        {
          data: dataShown(R, start),
          color: colors.recovered,
        },
        {
          data: dataShown(D, start),
          color: colors.death,
        },
      ],
      legend: legend.siro,
    },
    r0: R0,
  };
  return data;
}
