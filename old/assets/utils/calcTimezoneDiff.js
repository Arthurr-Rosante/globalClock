export default function calcTimezoneDiff(baseTime, cityTime) {
  const [hr1, min1] = baseTime.split(":").map(Number);
  const [hr2, min2] = cityTime.split(":").map(Number);

  // datas ficticias para fins de comparação
  const baseDate = new Date(1970, 0, 1, hr1, min1);
  const cityDate = new Date(1970, 0, 1, hr2, min2);

  // Calcula a diferença em milissegundos
  const diffInMs = cityDate - baseDate;

  // Converte a diferença para horas
  const diffInHours = diffInMs / (1000 * 60 * 60);

  // Determina se a cidade está adiantada ou atrasada em relação à base
  const isAhead = diffInHours > 0;
  // Arredonda a diferença para o número mais próximo
  const absoluteDifference = Math.round(Math.abs(diffInHours));

  return isAhead
    ? `${absoluteDifference} horas adiante`
    : `${absoluteDifference} horas atrás`;
}
