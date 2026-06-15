import { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
} from '@chakra-ui/react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiSearch, FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface DataTableProps<Data extends object> {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  searchPlaceholder?: string;
}

export function DataTable<Data extends object>({ data, columns, searchPlaceholder = "Rechercher..." }: DataTableProps<Data>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <Box w="full">
      <Flex justify="space-between" align="center" mb={4} gap={4}>
        <InputGroup maxW="320px">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input 
            placeholder={searchPlaceholder} 
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            bg="white"
            borderRadius="md"
            focusBorderColor="brand.500"
          />
        </InputGroup>
      </Flex>

      <Box bg="white" shadow="sm" rounded="xl" overflow="hidden" borderWidth="1px" borderColor="gray.200">
        <Box overflowX="auto">
          <Table variant="simple" size="md">
            <Thead bg="gray.50">
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const meta: any = header.column.columnDef.meta;
                    return (
                      <Th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        isNumeric={meta?.isNumeric}
                        cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                        userSelect="none"
                        color="gray.600"
                        fontWeight="bold"
                        letterSpacing="wider"
                        textTransform="uppercase"
                        fontSize="xs"
                        py={4}
                        position="relative"
                        width={header.column.getSize()}
                      >
                        <Flex align="center" gap={2}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <chakra.span pl="2">
                            {header.column.getIsSorted() ? (
                              header.column.getIsSorted() === 'desc' ? (
                                <FiArrowDown aria-label="sorted descending" />
                              ) : (
                                <FiArrowUp aria-label="sorted ascending" />
                              )
                            ) : null}
                          </chakra.span>
                        </Flex>
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.length === 0 ? (
                <Tr>
                  <Td colSpan={columns.length} textAlign="center" py={10} color="gray.500">
                    Aucun résultat trouvé.
                  </Td>
                </Tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <Tr key={row.id} _hover={{ bg: 'gray.50' }} transition="all 0.2s">
                    {row.getVisibleCells().map((cell) => {
                      const meta: any = cell.column.columnDef.meta;
                      return (
                        <Td key={cell.id} isNumeric={meta?.isNumeric} width={cell.column.getSize()} py={4}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Td>
                      );
                    })}
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Box>

        {/* Pagination */}
        <Flex
          justify="space-between"
          align="center"
          p={4}
          borderTopWidth="1px"
          borderColor="gray.200"
          bg="white"
        >
          <Flex align="center" gap={2}>
            <Text fontSize="sm" color="gray.600">
              Page{' '}
              <Text as="span" fontWeight="bold">
                {table.getState().pagination.pageIndex + 1}
              </Text>{' '}
              sur{' '}
              <Text as="span" fontWeight="bold">
                {table.getPageCount() === 0 ? 1 : table.getPageCount()}
              </Text>
            </Text>
            <Select
              size="sm"
              w="20"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex gap={2}>
            <Tooltip label="Première page">
              <IconButton
                aria-label="Première page"
                icon={<FiChevronsLeft />}
                size="sm"
                onClick={() => table.setPageIndex(0)}
                isDisabled={!table.getCanPreviousPage()}
              />
            </Tooltip>
            <Tooltip label="Page précédente">
              <IconButton
                aria-label="Page précédente"
                icon={<FiChevronLeft />}
                size="sm"
                onClick={() => table.previousPage()}
                isDisabled={!table.getCanPreviousPage()}
              />
            </Tooltip>
            <Tooltip label="Page suivante">
              <IconButton
                aria-label="Page suivante"
                icon={<FiChevronRight />}
                size="sm"
                onClick={() => table.nextPage()}
                isDisabled={!table.getCanNextPage()}
              />
            </Tooltip>
            <Tooltip label="Dernière page">
              <IconButton
                aria-label="Dernière page"
                icon={<FiChevronsRight />}
                size="sm"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                isDisabled={!table.getCanNextPage()}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
