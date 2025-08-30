import { Product } from "../../models/product.model";
import Table from 'react-bootstrap/Table';
import './TableProducts.css'

interface TableProps {
    items: Product[] | null;
    openModal: (item: Product) => void;
    onDelete: (item: Product) => void;
}


const TableProducts = ({ items, openModal, onDelete }: TableProps) => {

    return (
        <div className="table-products">
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th className="actions-cell">Editar/Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.stock}</td>
                            <td>
                                <button className="edit-button" onClick={() => openModal(item)}>
                                    Editar
                                </button>
                                <button className="delete-button" onClick={() => onDelete(item)}>
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
