export function detectType(value: string): string {
  const v = value.trim();

  if (/^'.*'$/.test(v)) return "VARCHAR(255)";
  if (/^\d+$/.test(v)) return "INT";
  if (/^\d+\.\d+$/.test(v)) return "DECIMAL(18,2)";
  if (/^NOW\(\)$/i.test(v)) return "DATETIME";
  if (/^'.*\d{4}-\d{2}-\d{2}.*'$/.test(v)) return "DATE";

  return "VARCHAR(255)";
}

export function detectStatementType(sql: string) {
  const upper = sql.toUpperCase().trim();

  if (upper.startsWith("INSERT INTO")) return "INSERT";
  if (upper.startsWith("UPDATE")) return "UPDATE";
  if (upper.startsWith("SELECT")) return "SELECT";
  if (upper.startsWith("DELETE FROM")) return "DELETE";

  return "UNKNOWN";
}

export function parseWhereClause(whereStr: string) {
  const conditions: string[] = [];
  const params: string[] = [];

  const parts = whereStr.split(/\s+(AND|OR)\s+/i);

  for (let i = 0; i < parts.length; i++) {
    if (["AND", "OR"].includes(parts[i].toUpperCase())) {
      conditions.push(parts[i]);
      continue;
    }

    const match = parts[i].match(/(\w+)\s*=\s*(.+)/);
    if (match) {
      const col = match[1];
      const val = match[2].trim();

      params.push(`IN p_${col} ${detectType(val)}`);
      conditions.push(`${col} = p_${col}`);
    } else {
      conditions.push(parts[i]);
    }
  }

  return { conditions, params };
}
