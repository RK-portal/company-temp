'use client'

import React from 'react'

import { cn } from '@/lib/cn'

export interface TableColumn {
  key: string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (value: any, row: any) => React.ReactNode
}

export interface TableProps {
  columns: TableColumn[]
  rows: any[]
  responsive?: boolean
  striped?: boolean
  className?: string
}

const Table: React.FC<TableProps> = ({ 
  columns, 
  rows, 
  responsive = true, 
  striped = false, 
  className 
}) => {
  const tableContent = (
    <table className="min-w-full divide-y divide-neutral-200">
      <thead className="bg-neutral-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className={cn(
                'px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider',
                column.align === 'center' && 'text-center',
                column.align === 'right' && 'text-right'
              )}
              style={{ width: column.width }}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-neutral-200">
        {rows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={cn(
              striped && rowIndex % 2 === 1 && 'bg-neutral-50'
            )}
          >
            {columns.map((column) => {
              const value = row[column.key]
              const content = column.render ? column.render(value, row) : value
              
              return (
                <td
                  key={column.key}
                  className={cn(
                    'px-6 py-4 whitespace-nowrap text-sm text-neutral-900',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                >
                  {content}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div 
      className={cn('shadow overflow-hidden border-b border-neutral-200 sm:rounded-lg', className)}
      data-testid="table"
    >
      {responsive ? (
        <div className="overflow-x-auto">
          {tableContent}
        </div>
      ) : (
        tableContent
      )}
    </div>
  )
}

export default Table