export default function average(array) {
  if (array.length === 0) return 0;
  return (array.reduce((total, a) => total + a, 0) / array.length).toFixed(1);
}
