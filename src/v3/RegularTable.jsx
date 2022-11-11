const RegularTable = (props) => {
  const { rows = [], columns = [], getRowId } = props;
  if (!rows.length) return null;

  return (
    <table className="regularTable">
      <thead>
        <tr>
          {columns.map((el) => (
            <th key={el.field}>{el.headerName}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr key={getRowId(row)}>
            {columns.map((col) => (
              <td key={col.field}>{col.renderCell ? col.renderCell({ row }) : row[col.field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RegularTable;
