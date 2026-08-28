import { DataTableEmpty, LoadingCell, LoadingRow, Table, TableShell, TableWrap } from './DataTable.styles.js'

function DataTable({ columns = [], rows = [], rowKey, emptyState, loading = false, caption }) {
  const showEmpty = !loading && rows.length === 0

  return (
    <TableShell>
      <TableWrap>
        <Table>
          {caption ? <caption>{caption}</caption> : null}
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          {loading ? (
            <tbody>
              {Array.from({ length: 4 }).map((_, rowIndex) => (
                <LoadingRow key={rowIndex}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      <LoadingCell />
                    </td>
                  ))}
                </LoadingRow>
              ))}
            </tbody>
          ) : (
            <tbody>
              {rows.map((row) => (
                <tr key={rowKey ? rowKey(row) : row.id}>
                  {columns.map((column) => (
                    <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </TableWrap>
      {showEmpty ? <DataTableEmpty>{emptyState}</DataTableEmpty> : null}
    </TableShell>
  )
}

export default DataTable