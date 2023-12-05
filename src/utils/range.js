export const range = (start, stop, step = 1) => {
  if (start > stop) {
    return Array(Math.ceil(Math.abs(stop - start) / step))
      .fill(start)
      .map((x, y) => x - y * step)
      .filter((x) => x > 0)
  }

  return Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step)
}
