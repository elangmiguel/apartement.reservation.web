'use client';

import React from 'react';
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CButton,
    CPagination,
    CPaginationItem,
    CSpinner,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';

interface Column {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    loading?: boolean;
    onEdit?: (item: any) => void;
    onDelete?: (item: any) => void;
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({
    columns,
    data,
    loading = false,
    onEdit,
    onDelete,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
}) => {
    return (
        <>
            <CTable hover responsive>
                <CTableHead>
                    <CTableRow>
                        {columns.map((column) => (
                            <CTableHeaderCell key={column.key}>{column.label}</CTableHeaderCell>
                        ))}
                        {(onEdit || onDelete) && <CTableHeaderCell>Actions</CTableHeaderCell>}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {loading ? (
                        <CTableRow>
                            <CTableDataCell colSpan={columns.length + 1} className="text-center">
                                <CSpinner color="primary" />
                            </CTableDataCell>
                        </CTableRow>
                    ) : data.length === 0 ? (
                        <CTableRow>
                            <CTableDataCell colSpan={columns.length + 1} className="text-center">
                                No data available
                            </CTableDataCell>
                        </CTableRow>
                    ) : (
                        data.map((item, index) => (
                            <CTableRow key={item.id || index}>
                                {columns.map((column) => (
                                    <CTableDataCell key={column.key}>
                                        {column.render
                                            ? column.render(item[column.key], item)
                                            : item[column.key]}
                                    </CTableDataCell>
                                ))}
                                {(onEdit || onDelete) && (
                                    <CTableDataCell>
                                        {onEdit && (
                                            <CButton
                                                color="primary"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onEdit(item)}
                                                className="me-2"
                                            >
                                                <CIcon icon={cilPencil} />
                                            </CButton>
                                        )}
                                        {onDelete && (
                                            <CButton
                                                color="danger"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onDelete(item)}
                                            >
                                                <CIcon icon={cilTrash} />
                                            </CButton>
                                        )}
                                    </CTableDataCell>
                                )}
                            </CTableRow>
                        ))
                    )}
                </CTableBody>
            </CTable>

            {totalPages > 1 && onPageChange && (
                <CPagination align="center" aria-label="Page navigation">
                    <CPaginationItem
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        Previous
                    </CPaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                        <CPaginationItem
                            key={i}
                            active={i + 1 === currentPage}
                            onClick={() => onPageChange(i + 1)}
                        >
                            {i + 1}
                        </CPaginationItem>
                    ))}
                    <CPaginationItem
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        Next
                    </CPaginationItem>
                </CPagination>
            )}
        </>
    );
};

export default DataTable;
