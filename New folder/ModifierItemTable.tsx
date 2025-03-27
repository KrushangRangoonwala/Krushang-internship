import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '@/components/ui/Table'
import Input from '@/components/ui/Input'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { Pagination } from '@/components/ui'
import Select from '@/components/ui/Select'
import useThemeClass from '@/utils/hooks/useThemeClass'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import type {
    ColumnDef,
    FilterFn,
    ColumnFiltersState,
} from '@tanstack/react-table'
import type { InputHTMLAttributes } from 'react'
import {
    apiDeleteModifierItemData,
    getModifierItemData,
} from '@/services/ModifierService'
import { handleDelete } from '@/views/helper'

interface DebouncedInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'onChange' | 'size' | 'prefix'
    > {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
}
interface ModifierSet {
    firstName: string
    lastName: string
    email: string
    // Add other properties if needed
}

const { Tr, Th, Td, THead, TBody, Sorter } = Table
const pageSizeOption = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
]
function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: DebouncedInputProps) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <div className="flex justify-end">
            <div className="flex items-center mb-4">
                <span className="mr-2">Search:</span>
                <Input
                    {...props}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

const ModifierItemTable = () => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [selectedRow, setSelectedRow] = useState(null)
    const [data, setData] = useState<any>([])
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

    const [isOpen, setIsOpen] = useState(false)
    const [rowId, setRowId] = useState(0)

    const handleEdit = (id: number) => {
        setIsOpen(!isOpen)
        setRowId(id)
    }
    const ActionColumn = ({ row }: { row: ModifierSet }) => {
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()
        return (
            <div className="flex justify-end text-lg">
                {/* <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={() =>
                        handleView(
                            row.id as string,
                            'modifierset-item',
                            navigate
                        )
                    }
                >
                    <HiOutlinePencil />
                </span> */}
                <a
                    href={`/modifierset-item/${row.id}`} // Replace with your edit URL
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                >
                    <HiOutlinePencil />
                </a>
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={() =>
                        handleDelete(row.id, apiDeleteModifierItemData)
                    }
                >
                    <HiOutlineTrash />
                </span>
            </div>
        )
    }
    useEffect(() => {
        // Function to fetch data from the API
        async function fetchData() {
            try {
                const response = await getModifierItemData()
                if (response.status == 200) {
                    const jsonData = response.data
                    setData(jsonData)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const columns = useMemo<ColumnDef<ModifierSet>[]>(
        () => [
            { header: 'Modifier', accessorKey: 'name' },
            {
                header: 'Price',
                accessorKey: 'price',
                cell: (props) => {
                    return `$ ${props.row.original.price}`
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugHeaders: true,
        debugColumns: false,
    })

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }

    return (
        <>
            <DebouncedInput
                value={globalFilter ?? ''}
                className="p-2 font-lg shadow border border-block"
                placeholder="Search all columns..."
                onChange={(value) => setGlobalFilter(String(value))}
            />
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                }
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        const rowData = row.original // Get the entire ModifierSet object for the row

                        return (
                            <Tr
                                key={row.id}
                                // onClick={() => handleRowClick(rowData)} // Call handleRowClick on row click
                                className={
                                    selectedRow === rowData
                                        ? 'selected-row'
                                        : ''
                                }
                            >
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
                {showDeleteConfirmation && (
                    <div className="text-green-600 font-bold mt-4">
                        Delete successful! Refresh the page to see the changes.
                    </div>
                )}
            </Table>
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={table.getFilteredRowModel().rows.length}
                    onChange={onPaginationChange}
                />
                <div style={{ minWidth: 130 }}>
                    <Select
                        size="sm"
                        isSearchable={false}
                        value={pageSizeOption.filter(
                            (option) =>
                                option.value ===
                                table.getState().pagination.pageSize
                        )}
                        options={pageSizeOption}
                        onChange={(option) => onSelectChange(option?.value)}
                    />
                </div>
            </div>
        </>
    )
}

export default ModifierItemTable
