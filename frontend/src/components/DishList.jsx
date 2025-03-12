"use client"

import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"
import { Button } from "./ui/Button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { getAllDishes } from "../lib/api"

function DishList() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const data = await getAllDishes()
        setDishes(data)
      } catch (error) {
        console.error("Error fetching dishes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDishes()
  }, [])

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => (
          <Link to={`/dish/${row.original.id}`} className="font-medium text-primary hover:underline">
            {row.getValue("name")}
          </Link>
        ),
      },
      {
        accessorKey: "diet",
        header: "Diet",
        cell: ({ row }) => {
          const diet = row.getValue("diet")
          return <Badge variant={diet === "vegetarian" ? "success" : "destructive"}>{diet || "Unknown"}</Badge>
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
      {
        accessorKey: "flavor_profile",
        header: "Flavor",
        cell: ({ row }) => row.getValue("flavor_profile") || "Unknown",
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
      {
        accessorKey: "course",
        header: "Course",
        cell: ({ row }) => row.getValue("course") || "Unknown",
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
      {
        accessorKey: "state",
        header: "State",
        cell: ({ row }) => row.getValue("state") || "Unknown",
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
      {
        accessorKey: "region",
        header: "Region",
        cell: ({ row }) => row.getValue("region") || "Unknown",
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
    ],
    [],
  )

  const table = useReactTable({
    data: dishes,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Get unique values for filter dropdowns
  const getUniqueValues = (key) => {
    const values = new Set()
    dishes.forEach((dish) => {
      if (dish[key]) {
        values.add(dish[key])
      }
    })
    return Array.from(values).sort()
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start">
          <Input
            placeholder="Filter dishes..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />

          <div className="flex flex-wrap gap-2">
            {table.getColumn("diet") && (
              <Select
                onValueChange={(value) => {
                  table.getColumn("diet")?.setFilterValue(value === "all" ? undefined : value)
                }}
                defaultValue="all"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Diet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Diets</SelectItem>
                  {getUniqueValues("diet").map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {table.getColumn("course") && (
              <Select
                onValueChange={(value) => {
                  table.getColumn("course")?.setFilterValue(value === "all" ? undefined : value)
                }}
                defaultValue="all"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {getUniqueValues("course").map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {table.getColumn("region") && (
              <Select
                onValueChange={(value) => {
                  table.getColumn("region")?.setFilterValue(value === "all" ? undefined : value)
                }}
                defaultValue="all"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {getUniqueValues("region").map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {table.getFilteredRowModel().rows.length} of {dishes.length} dishes
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DishList

