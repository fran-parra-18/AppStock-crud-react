import { useState } from "react";
import { LOW_STOCK, Product } from "../../models/product.model";
import { formatCurrency } from "../../utils/format";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import './TableProducts.css'

interface TableProps {
    items: Product[];
    openModal: (item: Product) => void;
    onDelete: (item: Product) => void;
}

type SortKey = "id" | "name" | "price" | "stock";

interface Sort {
    key: SortKey;
    dir: "asc" | "desc";
}

const PAGE_SIZE = 10;

const columns: { key: SortKey; label: string; numeric?: boolean }[] = [
    { key: "id", label: "#ID" },
    { key: "name", label: "Nombre" },
    { key: "price", label: "Precio", numeric: true },
    { key: "stock", label: "Stock", numeric: true },
];

const compare = (a: Product, b: Product, key: SortKey) =>
    key === "name"
        ? a.name.localeCompare(b.name, "es")
        : Number(a[key]) - Number(b[key]);

const TableProducts = ({ items, openModal, onDelete }: TableProps) => {

    const [sort, setSort] = useState<Sort>({ key: "id", dir: "asc" });
    const [page, setPage] = useState(1);

    const sorted = [...items].sort((a, b) =>
        sort.dir === "asc" ? compare(a, b, sort.key) : compare(b, a, sort.key)
    );

    const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    // Si la búsqueda achica la lista, no quedarse en una página vacía
    const currentPage = Math.min(page, totalPages);
    const pageItems = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const handleSort = (key: SortKey) => {
        setSort((current) => ({
            key,
            dir: current.key === key && current.dir === "asc" ? "desc" : "asc",
        }));
        setPage(1);
    }

    return (
        <div className="table-products surface">
            <Table hover responsive>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className={col.numeric ? "text-end" : undefined}
                                aria-sort={sort.key === col.key ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}
                            >
                                <button type="button" className="sort-button" onClick={() => handleSort(col.key)}>
                                    {col.label}
                                    <span className="sort-icon">
                                        {sort.key === col.key ? (sort.dir === "asc" ? "▲" : "▼") : "↕"}
                                    </span>
                                </button>
                            </th>
                        ))}
                        <th className="actions-cell">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pageItems.map((item) => {
                        const stock = Number(item.stock);
                        return (
                            <tr key={item.id} className={stock <= LOW_STOCK ? "low-stock-row" : undefined}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td className="text-end">{formatCurrency(Number(item.price))}</td>
                                <td className="text-end">
                                    {stock === 0
                                        ? <span className="badge bg-danger">Sin stock</span>
                                        : stock <= LOW_STOCK
                                            ? <span className="badge bg-warning text-dark">{stock}</span>
                                            : stock}
                                </td>
                                <td className="actions-cell">
                                    <button className="btn btn-sm btn-outline-primary" onClick={() => openModal(item)}>
                                        Editar
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(item)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {totalPages > 1 && (
                <Pagination className="justify-content-center mt-3 mb-1">
                    <Pagination.Prev disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Página anterior">‹</Pagination.Prev>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <Pagination.Item key={n} active={n === currentPage} onClick={() => setPage(n)}>
                            {n}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} aria-label="Página siguiente">›</Pagination.Next>
                </Pagination>
            )}
        </div>
    );
}

export default TableProducts;
