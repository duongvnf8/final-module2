export function splitToColumns(list = [], rowsPerCol = 4, maxCols) {
  if (!Array.isArray(list) || list.length === 0) return [];

  const columns = [];

  for (let i = 0; i < list.length; i += rowsPerCol) {
    columns.push(list.slice(i, i + rowsPerCol));
  }

  return typeof maxCols === "number" ? columns.slice(0, maxCols) : columns;
}
