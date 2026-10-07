import Modal from "react-bootstrap/Modal";
import { Product } from "../../models/product.model";

interface ConfirmDeleteProps {
    item: Product;
    deleting: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDelete = ({ item, deleting, onConfirm, onCancel }: ConfirmDeleteProps) => {
    return (
        <Modal show centered onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Seguro que querés eliminar <strong>{item.name}</strong>? Esta acción no se puede deshacer.
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-outline-secondary" onClick={onCancel} disabled={deleting}>
                    Cancelar
                </button>
                <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={deleting}>
                    {deleting ? "Eliminando..." : "Eliminar"}
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmDelete;
