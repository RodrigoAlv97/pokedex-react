export default function percentageBar(value) {
  return `${Math.trunc(value * 100 / 256)}%`  
}