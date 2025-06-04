/** @jsxRuntime automatic */
/** @jsxImportSource https://esm.sh/preact@10.26.8 */

import { JSX } from "https://esm.sh/preact@10.26.8";

export function PlotHtmlTable(
  props: {
    data: (string | number)[][];
    mode: "ROW" | "COL";
    tableClassName?: string;
    caption?: string;
    thClassName?: string;
    tdClassName?: string;
  },
): JSX.Element {
  const {
    data,
    mode,
    tableClassName,
    caption,
    thClassName,
    tdClassName,
  } = props;

  const isColMode = mode === "COL";

  if (data.length === 0) {
    return <table className={tableClassName ?? ""}></table>;
  }

  const headerRow = isColMode ? data[0] : data.map((row) => row[0]);
  const bodyRows = isColMode ? data.slice(1) : data.map((row) => row.slice(1));

  function keyID(key: string | number): string {
    key = `${key}`;
    return typeof key === "string" &&
        key !== "=||" &&
        key !== ""
      ? key.replaceAll("【", "").replaceAll("】", "") as string
      : "noneNONE";
  }
  return (
    <table
      className={`${isColMode ? "plot-col-data1" : "plot-row-data1"} ${
        tableClassName ?? ""
      }`}
    >
      {caption && <caption>{caption}</caption>}

      <tbody>
        {isColMode
          ? (
            <>
              {/* Nagłówki */}
              <tr>
                {headerRow.map((key, colIndex) => {
                  const keyStr = keyID(key);
                  return (
                    <th
                      className={`table-val-type--${keyStr} ${
                        thClassName ?? ""
                      }`}
                      key={keyStr}
                    >
                      {key}
                    </th>
                  );
                })}
              </tr>
              {/* Dane */}
              {bodyRows.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {row.map((cell, colIndex) => {
                    const key = keyID(headerRow[colIndex]);
                    return (
                      <td
                        className={`table-val-type--${key} ${
                          tdClassName ?? ""
                        }`}
                        key={`${key}-row-${rowIndex}`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </>
          )
          : (
            <>
              {data.map((row, rowIndex) => {
                const key = keyID(row[0]);
                return (
                  <tr
                    className={`table-val-type--${key}`}
                    key={`series-row-${key}`}
                  >
                    <th scope="row" className={thClassName}>
                      {row[0]}
                    </th>
                    {row.slice(1).map((cell, colIndex) => (
                      <td
                        className={tdClassName}
                        key={`${key}-col-${colIndex}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </>
          )}
      </tbody>
    </table>
  );
}
