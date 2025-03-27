import { useState, useEffect, useMemo } from 'react'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import Sorter from '@/components/ui/Table/Sorter'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { handleDelete } from '@/views/helper'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
    apiDeleteModifierSetData,
    getModifierSetData,
} from '@/services/ModifierService'
import useThemeClass from '@/utils/hooks/useThemeClass'

interface ModifierSet {
    id: string
    name: string
    noOfRequired: number
    maximum: number
    modifierSetModifierItems: { length: number }
    items: { length: number }
}

interface DebouncedInputProps {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
    placeholder?: string
}

const { Tr, Th, Td, THead, TBody } = Table

const pageSizeOptions = [10, 20, 30, 40, 50].map((size) => ({
    value: size,
    label: `${size} / page`,
}))

const DebouncedInput: React.FC<DebouncedInputProps> = ({
    value,
    onChange,
    debounce = 500,
    ...props
}) => {
    const [inputValue, setInputValue] = useState(value)

    useEffect(() => {
        setInputValue(value)
    }, [value])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(inputValue)
        }, debounce)
        return () => clearTimeout(timeout)
    }, [inputValue, debounce, onChange])

    return (
        <div className="flex justify-end">
            <div className="flex items-center mb-4">
                <span className="mr-2">Search:</span>
                <Input
                    {...props}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
        </div>
    )
}

const ActionColumn: React.FC<{ row: ModifierSet }> = ({ row }) => {
    const { textTheme } = useThemeClass()
    return (
        <div className="flex justify-end text-lg">
            <a
                href={`/modifiers/${row.id}`}
                className={`cursor-pointer p-2 hover:${textTheme}`}
            >
                <HiOutlinePencil />
            </a>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={() => handleDelete(row.id, apiDeleteModifierSetData)}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const ModifierSetTable: React.FC = () => {
    const [data, setData] = useState<ModifierSet[]>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await getModifierSetData()
                if (response.status === 200) {
                    setData(response.data)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    const columns = useMemo(
        () => [
            { header: 'Modifier', accessorKey: 'name' },
            { header: 'No. of Required', accessorKey: 'noOfRequired' },
            { header: 'Maximum', accessorKey: 'maximum' },
            {
                header: '# of Modifier Items',
                accessorKey: 'modifierSetModifierItems.length',
            },
            { header: '# of Items', accessorKey: 'items.length' },
            {
                header: 'Actions',
                id: 'action',
                cell: ({ row }: any) => <ActionColumn row={row.original} />,
            },
        ],
        []
    )

    const fuzzyFilter = (row: any, columnId: string, value: string) => {
        return rankItem(row.getValue(columnId), value).passed
    }

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter },
        globalFilterFn: fuzzyFilter,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div>
            <DebouncedInput
                value={globalFilter}
                placeholder="Search all columns..."
                onChange={(value) => setGlobalFilter(String(value))}
            />
            {showDeleteConfirmation && (
                <div className="text-green-600 font-bold mt-4">
                    Deletion successful! Refresh the page to see the changes.
                </div>
            )}
            <div className="overflow-x-auto">
                <Table className="min-w-full">
                    <THead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        <div
                                            className={
                                                header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : ''
                                            }
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            <Sorter
                                                sort={header.column.getIsSorted()}
                                            />
                                        </div>
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </THead>
                    <TBody>
                        {table.getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            </div>
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={table.getFilteredRowModel().rows.length}
                    onChange={(page) => table.setPageIndex(page - 1)}
                />
                <Select
                    size="sm"
                    isSearchable={false}
                    value={pageSizeOptions.find(
                        (opt) =>
                            opt.value === table.getState().pagination.pageSize
                    )}
                    options={pageSizeOptions}
                    onChange={(option) =>
                        table.setPageSize(option?.value || 10)
                    }
                />
            </div>
        </div>
    )
}

export default ModifierSetTable
