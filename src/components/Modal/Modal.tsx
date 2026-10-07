import { useEffect, useRef } from "react";
import { Product } from "../../models/product.model";
import { CustomForm } from "../CustomForm/CustomForm";
import './Modal.css'

interface ModalProps {
    item: Product;
    edited: () => void;
    onClose: () => void;
}

const Modal = ({ item, edited, onClose }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <div className="overlay" onMouseDown={handleOverlayMouseDown}>
            <div className="product-modal surface" ref={modalRef}>
                <div className="product-modal-header">
                    <h2>Editar producto</h2>
                    <button type="button" className="btn-close" aria-label="Cerrar" onClick={onClose} />
                </div>
                <CustomForm item={item} edited={edited} />
            </div>
        </div>
    );
};

export default Modal;

