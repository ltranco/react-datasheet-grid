import React, { useState } from 'react'
import {
  DataSheetGrid,
  keyColumn,
  checkboxColumn,
  textColumn,
  Column,
  selectColumn,
} from 'react-datasheet-grid'
import 'antd/dist/antd.css'
import 'react-datasheet-grid/dist/style.css'
import './style.css'


function App() {
  const [data, setData] = useState([
    { active: true, firstName: 'Elon', lastName: 'Musk' },
    { active: false, firstName: 'Jeff', lastName: 'Bezos' },
  ])

  const columns: Column[] = [
    // {
    //   ...keyColumn('active', checkboxColumn),
    //   title: 'Active',
    // },
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
    },
  ]

  return (
    <div
      style={{
        margin: '50px',
        padding: '50px',
        maxWidth: '900px',
        background: '#f3f3f3',
      }}
    >
      <DataSheetGrid
        data={data}
        onChange={setData}
        columns={columns}
      />

      <pre>
        {
          JSON.stringify(data, null, 2)
        }
      </pre>
    </div>
  )
}

export default App
