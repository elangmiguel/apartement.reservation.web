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

/**
 * Definición de una columna del DataTable.
 * - `key`: identifica el campo dentro de cada fila.
 * - `label`: nombre visible en el encabezado.
 * - `render`: función opcional para renderizar contenido personalizado.
 */
interface Column {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
}

/**
 * Propiedades del componente DataTable.
 * - `columns`: estructura de columnas y metadatos asociados.
 * - `data`: conjunto de filas a mostrar.
 * - `loading`: controla el estado de carga y muestra un indicador.
 * - `onEdit`: callback ejecutado al solicitar edición de un elemento.
 * - `onDelete`: callback ejecutado al solicitar eliminación de un elemento.
 * - `currentPage`: número de página activa.
 * - `totalPages`: número total de páginas.
 * - `onPageChange`: callback para cambiar de página.
 */
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

/**
 * Componente genérico de tabla basado en CoreUI.
 * Implanta funcionalidades estándar como:
 * - Renderizado dinámico de columnas.
 * - Acciones por fila (editar, eliminar).
 * - Indicadores de carga.
 * - Control de paginación.
 */
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
            {/* Tabla principal */}
            <CTable hover responsive>
                <CTableHead>
                    <CTableRow>
                        {/* Encabezados dinámicos */}
                        {columns.map((column) => (
                            <CTableHeaderCell key={column.key}>{column.label}</CTableHeaderCell>
                        ))}

                        {/* Columna de acciones si corresponde */}
                        {(onEdit || onDelete) && <CTableHeaderCell>Actions</CTableHeaderCell>}
                    </CTableRow>
                </CTableHead>

                <CTableBody>
                    {/* Estado de carga */}
                    {loading ? (
                        <CTableRow>
                            <CTableDataCell colSpan={columns.length + 1} className="text-center">
                                <CSpinner color="primary" />
                            </CTableDataCell>
                        </CTableRow>
                    ) : data.length === 0 ? (
                        /* Mensaje cuando no hay datos */
                        <CTableRow>
                            <CTableDataCell colSpan={columns.length + 1} className="text-center">
                                No data available
                            </CTableDataCell>
                        </CTableRow>
                    ) : (
                        /* Renderizado de filas */
                        data.map((item, index) => (
                            <CTableRow key={item.id || index}>
                                {columns.map((column) => (
                                    <CTableDataCell key={column.key}>
                                        {column.render
                                            ? column.render(item[column.key], item)
                                            : item[column.key]}
                                    </CTableDataCell>
                                ))}

                                {/* Acciones de fila (editar / eliminar) */}
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

            {/* Paginación si aplica */}
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
