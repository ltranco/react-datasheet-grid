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
    { active: true, firstName: 'Elon', lastName: 'Musk' },
    { active: false, firstName: 'Jeff', lastName: 'Bezos' },
  ])

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
    {
      ...keyColumn('auto_format', createTextColumn<number>({
        formatBlurredInput: value => {
          const parsed = parseFloat(`${value}`);
          return isNaN(parsed) ? '' : `$${parsed}`;
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
  ]

  return (
    <div
      style={{
        margin: '50px',
        padding: '50px',
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
          gutterColumn={false}
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
