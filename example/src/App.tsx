import React, { useState } from 'react'
import {
  DataSheetGrid,
  keyColumn,
  checkboxColumn,
  textColumn,
  Column,
  selectColumn,
  createTextColumn,
} from 'react-datasheet-grid-nextjs'
import 'antd/dist/antd.css'
import 'react-datasheet-grid-nextjs/dist/style.css'
import './style.css'


function App() {
  const [data, setData] = useState([
    { active: true, firstName: 'Elon', lastName: 'Musk', gutter: 'EPS' },
    { active: false, firstName: 'Jeff', lastName: 'Bezos', gutter: 'Revenue' },
  ])

  const customGutterColumn: Column = {
    ...keyColumn('gutter', createTextColumn<string>({
      formatBlurredInput: (value, rowIndex) => value,
    })),
    width: '0 0 100px',
  };

  const columns: Column[] = [
    {
      ...keyColumn('active', checkboxColumn),
      title: 'Active',
    },
    {
      ...keyColumn('description', textColumn),
      title: 'Description',
    },
    {
      ...keyColumn('auto_format', createTextColumn<number>({
        formatBlurredInput: (value, rowIndex) => {
          const prefix = rowIndex === 0 ? '$' : '';
          const parsed = parseFloat(`${value}`);
          return isNaN(parsed) ? '' : `${prefix}${parsed}`;
        },
        inputModeForRowIndex: (rowIndex) => "decimal",
        additionalClassNamesForInput: (rowIndex) => {
          return rowIndex % 2 === 0 ? 'even-row-auto-format-col' : ''
        },
      })),
      title: 'Auto format',
    },
    {
      ...keyColumn('firstName', textColumn),
      title: 'First name',
    },
    {
      ...keyColumn('lastName', textColumn),
      title: 'Last name',
      width: 2,
    },
    {
      ...selectColumn({
        choices: [
          { value: '7', label: 'Model 3' },
          { value: '8', label: 'Model 7' },
          { value: '9', label: 'Model Y' },
        ],
        key: 'category',
      }),
      title: 'Category',
      width: 0.5,
    },
  ]

  return (
    <div
      style={{
        background: '#f3f3f3',
      }}
    >
      <h1>Basic usage</h1>
      <DataSheetGrid
        value={data}
        onChange={setData}
        columns={columns}
      />

      <h1>Minimal</h1>

      <div style={{
        padding: '50px',
        background: '#141416',
      }}>
        <DataSheetGrid
          className="minimal-grid"
          value={data}
          onChange={setData}
          columns={columns}
          gutterColumn={customGutterColumn}
          rowClassName={({rowData, rowIndex}) => rowIndex === data.length - 1 ? 'dsg-last-row' : ''}
          lockRows
        />
      </div>

      <pre>
        {
          JSON.stringify(data, null, 2)
        }
      </pre>
    </div>
  )
}

export default App
