"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Select from "@/components/composite/select-components";
import Table from "@/components/composite/table";

import { getAgencies, type AgencyData } from "@/services/agency";
import { ACTIVE_STATUS, defaultTableParams } from "@/constants/table";

import type { TableParams } from "@/types/table";
import type { TableProps } from "antd";
import type { FilterValue } from "antd/es/table/interface";
import { SquarePen } from "lucide-react";

const columns: TableProps<AgencyData>["columns"] = [
  {
    title: "No",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "대행사명",
    dataIndex: "agency",
    sorter: true,
    align: "center",
  },
  {
    title: "대표자명",
    dataIndex: "owner",
    sorter: true,
    align: "center",
  },
  {
    title: "사업자 등록 번호",
    dataIndex: "bussiness_num",
    sorter: true,
    align: "center",
  },
  {
    title: "관리",
    dataIndex: "action",
    align: "center",
    width: 100,
    render: () => (
      <div className="flex justify-center items-center w-full">
        <SquarePen className="w-4 h-4 text-blue-500 cursor-pointer text-center" />
      </div>
    ),
  },
  {
    title: "활성여부",
    dataIndex: "status",
    sorter: true,
    align: "center",
    width: 150,
    render: (value: boolean, record) => {
      const selectedValue = value ? "active" : "inactive";

      return (
        <Select
          options={ACTIVE_STATUS}
          value={selectedValue}
          onChange={(newValue) => {
            console.log(`id: ${record.id}, 변경된 값: ${newValue}`);
          }}
        />
      );
    },
  },
  {
    title: "가입일",
    dataIndex: "date",
    sorter: true,
    align: "center",
  },
];

const TableSection = () => {
  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams);

  const { data, isLoading, error } = useQuery<{
    data: AgencyData[];
    total: number;
  }>({
    queryKey: ["agencies", tableParams],
    queryFn: () => getAgencies(tableParams),
    placeholderData: (previousData) => previousData,
  });

  console.log("Query State:", { isLoading, error, tableParams, data });

  const handleTableChange: TableProps<AgencyData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination: {
        current: pagination.current ?? 1,
        pageSize: pagination.pageSize ?? 10,
      },
      filters: filters as Record<string, FilterValue>,
      sortField: !Array.isArray(sorter) ? String(sorter.field) : undefined,
      sortOrder: !Array.isArray(sorter) ? sorter.order : undefined,
    });
  };

  return (
    <Table<AgencyData>
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data?.data ?? []}
      pagination={{
        ...tableParams.pagination,
        total: data?.total,
      }}
      loading={isLoading}
      onChange={handleTableChange}
    />
  );
};

export default TableSection;
