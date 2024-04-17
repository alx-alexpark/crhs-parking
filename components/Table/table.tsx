import React, { ReactNode, useMemo, useState } from 'react';

import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from '@radix-ui/react-icons';
import styles from './table.module.scss';

interface TableProps {
  children: ReactNode;
  header: TableHeader[];
  title?: string;
  data: (string | number)[][];
  bodyWrapper?: (child: ReactNode, index: number) => ReactNode;
  formatter?: (data: (string | number)[]) => string[];
}

type TableHeader = [string, boolean];

const sortStateIcons = { asc: <CaretUpIcon />, desc: <CaretDownIcon /> };

export default function Table({
  children,
  header,
  title,
  data,
  bodyWrapper,
  formatter,
}: TableProps) {
  const maxItems = 10;
  let index = 0;

  type SortStateType = { key: number | null; order: 'asc' | 'desc' };

  const [sort, setSort] = useState<SortStateType>({
    key: null,
    order: 'asc',
  });

  function changeSort(key: number) {
    // Set as ascending order by default if the key is different
    if (sort.key !== key) {
      setSort({ key, order: 'asc' });
      return;
    }

    // Switch between ascending and descending order
    return setSort({
      key,
      order: sort.order === 'asc' ? 'desc' : 'asc',
    });
  }

  // Sort the data whenever the sort state changes
  const sortedData = useMemo(() => {
    if (sort.key === null) {
      return data;
    }

    return data.sort((a, b) => {
      let aVal = a[sort.key!];
      let bVal = b[sort.key!];

      // Sort by number
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        if (sort.order === 'asc') {
          return aVal - bVal;
        }

        return bVal - aVal;
      }

      // Sort by string
      aVal = String(aVal).toLocaleLowerCase();
      bVal = String(bVal).toLocaleLowerCase();

      if (sort.order === 'asc') {
        return aVal.localeCompare(bVal);
      }

      // Descending order
      return bVal.localeCompare(aVal);
    });
  }, [sort]);

  const hasChildren = React.Children.toArray(children).length > 0;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <title>{title}</title>
        <thead>
          <tr>
            {header.map(([title, canSort], index) => (
              <th
                scope="col"
                onClick={() => canSort && changeSort(index)}
                key={index}
                data-sortable={canSort ? 'sortable' : null}
              >
                {title}
                {canSort &&
                  (sort.key === index ? (
                    sortStateIcons[sort.order]
                  ) : (
                    <CaretSortIcon />
                  ))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hasChildren
            ? children
            : sortedData.map((row, index) => {
                const element = (
                  <tr key={index}>
                    {(formatter?.(row) ?? row).map((cell, index) => (
                      <td key={index}>{cell}</td>
                    ))}
                  </tr>
                );

                return bodyWrapper ? bodyWrapper(element, index) : element;
              })}
        </tbody>
      </table>
      <div>
        <span>
          Showing {index + 1} to {(index + 1) * maxItems} of {sortedData.length}{' '}
          entries
        </span>
      </div>
    </div>
  );
}
