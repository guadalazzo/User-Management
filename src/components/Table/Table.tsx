import './style.scss';

export default function Table({ columns, children }: { columns: string[]; children: any }) {
  return (
    <table className="cultivations-table">
      <thead>
        <tr>
          {columns.map((column, index) => {
            return <th key={`${column}-${index}`}>{column}</th>;
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
