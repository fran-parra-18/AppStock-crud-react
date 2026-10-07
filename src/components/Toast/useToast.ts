import { useContext } from "react";
import { ToastContext } from "./ToastContext";

export const useToast = () => {
    const showToast = useContext(ToastContext);

    if (!showToast) {
        throw new Error("useToast debe usarse dentro de ToastProvider");
    }

    return showToast;
}
