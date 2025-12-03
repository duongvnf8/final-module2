export function formatColumns(items = [], itemsPerColumn = 4, maxColumns) {
  if (!Array.isArray(items) || items.length === 0) return [];

  const result = [];

  for (let i = 0; i < items.length; i += itemsPerColumn) {
    const column = items.slice(i, i + itemsPerColumn);
    result.push(column);
  }

  return typeof maxColumns === 'number' ? result.slice(0, maxColumns) : result;
}
