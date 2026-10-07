import { ReactNode, useCallback, useRef, useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { ShowToast, ToastContext, ToastVariant } from "./ToastContext";

interface ToastItem {
    id: number;
    message: string;
    variant: ToastVariant;
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const nextId = useRef(0);

    const showToast = useCallback<ShowToast>((message, variant = "success") => {
        const id = nextId.current++;
        setToasts((current) => [...current, { id, message, variant }]);
    }, []);

    const removeToast = (id: number) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <ToastContainer position="bottom-end" className="p-3 position-fixed">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        bg={toast.variant}
                        autohide
                        delay={3000}
                        onClose={() => removeToast(toast.id)}
                    >
                        <Toast.Body className="d-flex justify-content-between align-items-center text-white">
                            {toast.message}
                            <button type="button" className="btn-close btn-close-white ms-3" aria-label="Cerrar" onClick={() => removeToast(toast.id)} />
                        </Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
}
