export const convertSecToMin = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds - minutes * 60;

  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};
