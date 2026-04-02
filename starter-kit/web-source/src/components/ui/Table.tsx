import React from 'react';
import './Table.css';

interface Column<T> {
  key: string;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  striped = false,
  hoverable = false,
  className = '',
}: TableProps<T>) {
  return (
    <div className="table-container">
      <table
        className={`table ${striped ? 'table--striped' : ''} ${hoverable ? 'table--hoverable' : ''} ${className}`.trim()}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
