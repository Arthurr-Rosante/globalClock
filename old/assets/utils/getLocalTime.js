export default function getLocalTime(timeZone) {
  const options = {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("pt-BR", options).format(new Date());
}
