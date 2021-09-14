import { Dimensions } from "react-native";

import moment from 'moment';
moment().format();

export const chartWidth = Dimensions.get("window").width - 20;
export const chartHeight = 220;
export const segments = 5;

export const withInnerLines = false;
export const withVerticalLabels = true;

export const chartConfig = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",

  fillShadowGradient: "#fff",
  fillShadowGradientOpacity: 0,
  useShadowColorFromDataset: true,

  backgroundGradientFromOpacity: 1,
  backgroundGradientToOpacity: 1,

  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

  strokeWidth: 4,
  decimalPlaces: 0,

  propsForDots: {
    r: "3",
    strokeWidth: "0",
  },
};

export const colors = {
  susceptible: (opacity = 1) => `rgba(255, 204, 92, ${opacity})`,
  infectious: (opacity = 1) => `rgba(255, 111, 105, ${opacity})`,
  recovered: (opacity = 1) => `rgba(150, 206, 180, ${opacity})`,
  death: (opacity = 1) => `rgba(198,188, 182, ${opacity})`,
  dataBrasil: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
};

export const legend = {
  sir: ["Suscetíveis", "Infectados", "Recuperados"],
  siro: ["Suscetíveis", "Infectados", "Recuperados", "Óbitos"],
};

export const details = {
  population: {
    title: "População total",
    description: "Referente ao número total de pessoas da simulação.",
  },
  infectious: {
    title: "Infectados",
    description:
      "Referente ao número de pessoas infectadas pelo vírus e que podem transmitir a terceiros.",
  },
  recovered: {
    title: "Recuperados",
    description:
      "Referente ao número de pessoas que se recuperaram do vírus ou morreram devido a infecção.",
  },
  days: {
    title: "Dias",
    description: "Referente ao número de dias da simulação.",
  },
  alpha: {
    title: "Taxa de Infecção",
    description:
      "Referente ao número de pessoas que podem ser infectadas se tiverem contato com uma pessoa que esteja com o vírus ativo.",
  },
  gamma: {
    title: "Taxa de Recuperação",
    description:
      "Referente ao número de pessoas recuperadas em um período de tempo.",
  },
  beta: {
    title: "Taxa de Mortalidade",
    description:
      "Referente ao número de pessoas infectadas mortas em um período de tempo.",
  },
};

//verifica se o valor informado é um numero inteiro
export function isIntegerNumber(value) {
  return /^[0-9]+$/.test(value);
}

//verifica se o valor informado é um numero
export function isNumber(value) {
  return /^\d+(?:\.\d+)?$/.test(value);
}

//gera array a partir de uma quantidade de dias informados (max 10 valores)
//ex.: 30 dias => 0 3 6 9 12 15 18 21 24 27
export function generateLabels(start, end) {
  let days = end-start;
  let labels = [];
  let maxNumberOfLabels = 10;
  let intervalBetweenLabels = days / maxNumberOfLabels;

  let aux = 1;

  for (let i = start; i <= start + (maxNumberOfLabels) * intervalBetweenLabels; i += intervalBetweenLabels) {
    let date = moment("2020-01-22", "YYYY-MM-DD").add(i, "d");
    aux++;
    labels.push(date.format("DD/MM/YYYY"));
  }
  
  return labels;
}

//retorna array com apenas 10 valores aparentes, deixando os outros "invisíveis"
//ex.:"0" "1" "2" "3" "4" "5" "6" "7" "8" "9" "10" "11" "12" "13" "14" "15" "16" "17" "18" "19"  =>  "0" "" "2" "" "4" "" "6" "" "8" "" "10" "" "12" "" "14" "" "16" "" "18" ""
export function labels(data = []) {
  let newLabels = data;
  let newLabelsSize = newLabels.length;

  let maxNumberOfLabels = 10;
  let intervalBetweenLabels = parseInt(newLabelsSize / maxNumberOfLabels);

  let aux = 1;

  newLabels = newLabels.map((item, index) => {
    if (index % intervalBetweenLabels == 0 && aux <= maxNumberOfLabels) {
      aux++;
      return item + "";
    } else return "";
  });
  return newLabels;
}

//retorna array com ate 30 valores, excluindo os demais
//ex.:"0" "1" "2" "3" "4" "5" "6" "7" "8" "9" "10" "11" "12" "13" "14" "15" "16" "17" "18" "19"  =>  "0"  "2"  "4"  "6"  "8"  "10"  "12"  "14"  "16"  "18"
export function dataShown(data = [], start = 0, end = 0) {

  if(end!=0){
    var newLabels = data.slice(0, end-start);
  }else{
    var newLabels = data;
  }
  let newLabelsSize = newLabels.length;
  let numberOfLabels = 150;

  if (newLabelsSize < numberOfLabels) return newLabels;

  let intervalBetweenLabels = parseInt(newLabelsSize / numberOfLabels);

  let aux = 1;

  newLabels = newLabels.filter((item, index) => {
    if (index % intervalBetweenLabels == 0 && aux <= numberOfLabels) {
      aux++;
      return true;
    } else return false;
  });
  return newLabels;
}

//retorna mensagem/dados e valor verdadeiro ou falso para indicar a validação dos campos
export function validation(
  days = 0,
  susceptible = 0,
  infectious = 0,
  recovered = 0,
  alpha = 0,
  gamma = 0
) {
  let isValid,
    response,
    erroMessage = [];

  isIntegerNumber(susceptible) &&
  isIntegerNumber(infectious) &&
  isIntegerNumber(recovered) &&
  isIntegerNumber(days)
    ? undefined
    : erroMessage.push("- Campos não numéricos ou valores não inteiros;");

  parseInt(susceptible) >= 0
    ? undefined
    : erroMessage.push("- População total negativa ou igual a zero;");

  parseInt(infectious) <= parseInt(susceptible)
    ? undefined
    : erroMessage.push(
        "- Número de infectados maior que o número da população total;"
      );

  parseInt(recovered) <= parseInt(susceptible)
    ? undefined
    : erroMessage.push(
        "- Número de recuperados maior que o número da população total;"
      );

  parseInt(infectious) + parseInt(recovered) <= parseInt(susceptible)
    ? undefined
    : erroMessage.push(
        "- Número de infectados e recuperados (somados) maior que o número da população total;"
      );

  parseInt(days) <= 300 && parseInt(days) >= 10
    ? undefined
    : erroMessage.push(
        "- Número de dias inferior a dez (10) ou superior a trezentos (300);"
      );

  isValid = erroMessage.length == 0;

  response = {
    response: isValid,
    message: isValid
      ? {
          days: parseInt(days),
          susceptible: parseInt(susceptible),
          infectious: parseInt(infectious),
          recovered: parseInt(recovered),
          alpha: parseFloat(alpha),
          gamma: parseFloat(gamma),
        }
      : `Por favor, verifique os casos abaixo:\n\n${erroMessage.join(
          "\n\n"
        )}\n\n\nPara saber mais, clique no botão de informações ao lado dos campos.`,
  };

  return response;
}

//retorna dados e valor verdadeiro para indicar a validação dos campos
// Modelo SIRO teste
export function validationSiro(
  days = 0,
  susceptible = 0,
  infectious = 0,
  recovered = 0,
  death = 0,
  beta = 0,
  alpha = 0,
  gamma = 0,
  start = 0,
  end = 0
) {
  return {
    response: true,
    message: {
      days: parseInt(days),
      susceptible: parseInt(susceptible),
      infectious: parseInt(infectious),
      recovered: parseInt(recovered),
      alpha: parseFloat(alpha),
      gamma: parseFloat(gamma),
      beta: parseFloat(beta),
      death: parseInt(death),
      start: parseInt(start),
      end: parseInt(end),
    },
  };
}

export function validationSiroParams(
  days = 0,
  susceptible = 0,
  infectious = 0,
  recovered = 0,
  death = 0,
  start = 0,
  end = 0,
  m = 0,
  t0 = 0,
  tr = 0,
  ti = 0,
  tf = 0,
  r = 0,
  b = 0
) {
  return {
    response: true,
    message: {
      days: parseInt(days),
      susceptible: parseInt(susceptible),
      infectious: parseInt(infectious),
      recovered: parseInt(recovered),
      death: parseInt(death),
      start: parseInt(start),
      end: parseInt(end),
      m: parseFloat(m),
      t0: parseFloat(t0),
      tr: parseFloat(tr),
      ti: parseFloat(ti),
      tf: parseFloat(tf),
      r: parseFloat(r),
      b: parseFloat(b),
    },
  };
}
