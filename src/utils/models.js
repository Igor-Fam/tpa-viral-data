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
  start = 0,
  end = 0
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
      labels: generateLabels(start, end),
      datasets: [
        {
          data: dataShown(S, start, end),
          color: colors.susceptible,
        },
        {
          data: dataShown(I, start, end),
          color: colors.infectious,
        },
        {
          data: dataShown(R, start, end),
          color: colors.recovered,
        },
        {
          data: dataShown(D, start, end),
          color: colors.death,
        },
      ],
      legend: legend.siro,
    },
    r0: R0,
  };
  return data;
}

export function siro_params({
  days = 30,
  population = 209300000,
  infectious = 1,
  recovered = 0,
  death = 0,
  start = 0,
  end = 0,
  m = 0.0184,
  t0 = 28.4,
  tr = 23.4,
  ti = 29.1,
  tf = 49.9,
  r = 0.399,
  b = 0.201

}) {

  console.log(start);
  let R0,
    step = 1,
    S = [],
    I = [],
    R = [],
    D = [],
    a = [],
    gamma = (1-m)*(1/tr),
    beta = m*1/t0;

  const deltaT = 1 / step;

  D[0] = death;
  R[0] = recovered;
  I[0] = infectious;
  S[0] = population - infectious - death;

  R0 = b / (gamma + beta);

  for (let i = 1; i < days * step; i++) {

    a[i] = (i<ti ? 1 : (i>tf? r : ( (1-r)/(ti-tf)*(i-ti) + 1 )));
    let alpha = a[i]*b;

    S[i] = S[i - 1] + -(alpha / population) * S[i - 1] * I[i - 1] * deltaT;
    I[i] = I[i - 1] + ((alpha / population) * S[i - 1] * I[i - 1] - (gamma + beta) * I[i - 1]) * deltaT;
    R[i] = R[i - 1] + gamma * I[i - 1] * deltaT;
    D[i] = D[i - 1] + beta * I[i - 1] * deltaT;
  }
  const data = {
    chart: {
      labels: generateLabels(start, end),
      datasets: [
        {
          data: dataShown(S, start, end),
          color: colors.susceptible,
        },
        {
          data: dataShown(I, start, end),
          color: colors.infectious,
        },
        {
          data: dataShown(R, start, end),
          color: colors.recovered,
        },
        {
          data: dataShown(D, start, end),
          color: colors.death,
        },
      ],
      legend: legend.siro,
    },
    r0: R0,
  };
  return data;
}