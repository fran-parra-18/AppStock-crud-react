import { Product } from "../../models/product.model";
import { formatCurrency } from "../../utils/format";
import Table from 'react-bootstrap/Table';
import './TableProducts.css'

interface TableProps {
    items: Product[];
    openModal: (item: Product) => void;
    onDelete: (item: Product) => void;
}

const TableProducts = ({ items, openModal, onDelete }: TableProps) => {

    return (
        <div className="table-products surface">
            <Table hover responsive>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Nombre</th>
                        <th className="text-end">Precio</th>
                        <th className="text-end">Stock</th>
                        <th className="actions-cell">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td className="text-end">{formatCurrency(Number(item.price))}</td>
                            <td className="text-end">{item.stock}</td>
                            <td className="actions-cell">
                                <button className="btn btn-sm btn-outline-primary" onClick={() => openModal(item)}>
                                    Editar
                                </button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(item)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TableProducts;
