import React, { useLayoutEffect, useRef } from 'react'
import { CellComponent, CellProps, Column } from '../types'
import { Select } from 'antd'
const { Option } = Select

const SelectComponent = React.memo<CellProps<string | any, any>>(
    ({
        active,
        rowData,
        setRowData,
        focus,
        stopEditing,
        columnData,
    }) => {
        const ref = useRef<any>(null);
        const dataKey = columnData.key;

        useLayoutEffect(() => {
            if (focus) {
                ref.current?.focus();
            } else {
                ref.current?.blur();
            }
        }, [focus]);

        return (
            <Select
                ref={ref}
                disabled={columnData.disabled}
                value={
                    columnData.choices.find((choice: any) => {
                        return rowData && choice.value === rowData[dataKey];
                    })?.value
                }
                onChange={value => {
                    setRowData({
                        ...rowData,
                        [dataKey]: value
                    });
                    setTimeout(stopEditing, 0);
                }}
            >
                {
                    columnData.choices.map((option: any) =>
                        <Option
                            key={option.value}
                            value={option.value}>
                            {option.label}
                        </Option>
                    )
                }
            </Select>
        )
    }
)

SelectComponent.displayName = 'SelectComponent'

export const selectColumn = (options: { key: string, choices: any[] }) => {
    const key: string = options.key;

    return {
        columnData: options,
        disableKeys: true,
        keepFocus: true,
        component: SelectComponent as CellComponent<string | null, any>,
        deleteValue: (data: any) => {
            const rowData = data.rowData;

            return {
                ...rowData,
                [key]: null,
            };
        },
        copyValue: (data: any) => data.rowData[key],
        pasteValue: (data: any) => ({
            ...data.rowData,
            [key]: data.value
        })
    }
}