import { detectType, parseWhereClause } from "./parser";

export function generateInsert(sql: string, tableName: string) {
    const procName = `sp_insert_${tableName}`;

    // Normalize sql to lower for matching
    const lowerSql = sql.toLowerCase();

    // Check if columns are specified
    const columnsMatch = sql.match(/insert\s+into\s+\w+\s*\(([^)]+)\)\s*values/i);
    const columns = columnsMatch ? columnsMatch[1].split(",").map(x => x.trim()) : [];

    // Extract the VALUES part
    const valuesIndex = lowerSql.indexOf('values');
    const valuesSql = (valuesIndex !== -1) ? sql.substring(valuesIndex + 'values'.length).trim() : '';

    // Get all value rows from VALUES part
    const rowMatches = [...valuesSql.matchAll(/\(([^)]+)\)/g)];
    const firstRow = rowMatches[0]?.[1].split(",").map(v => v.trim()) || [];

    // PARAMS based on first row types
    let params = columns.map((c, i) => {
        const val = firstRow[i] ?? "NULL";
        return `IN p_${c} ${detectType(val)}`;
    });

    // If no columns, use generic params
    if (columns.length === 0) {
        params = firstRow.map((val, i) => `IN p_col${i + 1} ${detectType(val)}`);
    }

    // INSERT WITH PARAMS
    const insertParamLine = `VALUES (${columns.length > 0 ? columns.map(c => `p_${c}`).join(", ") : firstRow.map((_, i) => `p_col${i + 1}`).join(", ")})`;

    const originalColumns = columns.length > 0 ? `(${columns.join(", ")})` : "";

    return {
        proc: `
DELIMITER $$

CREATE PROCEDURE ${procName}(
    ${params.join(",\n    ")}
)
BEGIN
    INSERT INTO ${tableName} ${originalColumns}
    ${insertParamLine};
END $$

DELIMITER ;
    `.trim(),
        call: `CALL ${procName}(${firstRow.join(", ")});`,
    };
}

export function generateUpdate(sql: string, tableName: string) {
    const procName = `sp_update_${tableName}`;

    const setMatch = sql.match(/set\s+([^]+?)\s+where/i);
    const setStr = setMatch?.[1] || "";
    const setParts = setStr.split(",").map(x => x.trim());

    const setCols: string[] = [];
    const setVals: string[] = [];
    const setParams: string[] = [];

    setParts.forEach(p => {
        const m = p.match(/(\w+)\s*=\s*(.+)/);
        if (m) {
            setCols.push(m[1]);
            setVals.push(m[2].trim());
            setParams.push(`IN p_${m[1]} ${detectType(m[2].trim())}`);
        }
    });

    const whereMatch = sql.match(/where\s+(.+)/i);
    const whereStr = whereMatch?.[1] || "";
    const { conditions, params: whereParams } = parseWhereClause(whereStr);

    const updateSet = setCols.map(c => `${c} = p_${c}`).join(", ");
    const updateWhere = conditions.length > 0 ? `WHERE ${conditions.join(" ")}` : "";

    const whereVals = (whereStr.match(/=\s*(.+?)(?=\s*(AND|OR|$))/g) || []).map(m => m.replace(/=\s*/, "").trim());

    const rawCall = [...setVals, ...whereVals];

    return {
        proc: `
DELIMITER $$

CREATE PROCEDURE ${procName}(
    ${[...setParams, ...whereParams].join(",\n    ")}
)
BEGIN
    UPDATE ${tableName}
    SET ${updateSet}
    ${updateWhere};
END $$

DELIMITER ;
    `.trim(),
        call: `CALL ${procName}(${rawCall.join(", ")});`,
    };
}

export function generateSelect(sql: string, tableName: string) {
    const procName = `sp_select_${tableName}`;

    const colMatch = sql.match(/select\s+([^]+?)\s+from/i);
    const selectCols = colMatch ? colMatch[1].trim() : "*";

    const whereMatch = sql.match(/where\s+(.+)/i);
    const whereStr = whereMatch ? whereMatch[1] : "";

    const { conditions, params } = parseWhereClause(whereStr);

    const rawCallValues = whereStr.match(/=\s*(.+?)(?=\s*(AND|OR|$))/g)?.map((m) => m.replace(/=\s*/, "").trim()) || [];

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" ")}` : "";

    return {
        proc: `
DELIMITER $$

CREATE PROCEDURE ${procName}(
    ${params.join(",\n    ")}
)
BEGIN
    SELECT ${selectCols}
    FROM ${tableName}
    ${whereClause};
END $$

DELIMITER ;
    `.trim(),
        call: `CALL ${procName}(${rawCallValues.join(", ")});`,
    };
}

export function generateDelete(sql: string, tableName: string) {
    const procName = `sp_delete_${tableName}`;

    const whereMatch = sql.match(/where\s+(.+)/i);
    const whereStr = whereMatch ? whereMatch[1] : "";

    const { conditions, params } = parseWhereClause(whereStr);

    const rawCallValues = whereStr.match(/=\s*(.+?)(?=\s*(AND|OR|$))/g)?.map((m) => m.replace(/=\s*/, "").trim()) || [];

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" ")}` : "";

    const warning = whereClause === "" ? "-- Warning: This procedure deletes all rows from the table!\n" : "";

    return {
        proc: `
${warning}DELIMITER $$

CREATE PROCEDURE ${procName}(
    ${params.join(",\n    ")}
)
BEGIN
    DELETE FROM ${tableName}
    ${whereClause};
END $$

DELIMITER ;
    `.trim(),
        call: `CALL ${procName}(${rawCallValues.join(", ")});`,
    };
}