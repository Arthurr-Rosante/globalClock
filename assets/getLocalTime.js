function getLocalTime(timeZone) {
  const options = {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("pt-BR", options).format(new Date());
};
