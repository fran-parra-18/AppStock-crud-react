import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputForm from "./components/CustomInput";
import { FormValues, schema } from "./models";
import { yupResolver } from "@hookform/resolvers/yup";
import { newProduct, updateProduct } from "../../service/api.service";
import { emptyProduct, Product } from "../../models/product.model";
import "./CustomeFrom.css"
import { useApi } from "../../hook/useApi";
import { useToast } from "../Toast/useToast";

interface CustomFormProps {
    item?: Product;
    edited?: () => void;
}


export const CustomForm = ({ item, edited }: CustomFormProps) => {

    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: "onBlur",
        defaultValues: item ?? emptyProduct
    });

    const { loading, error, fetch } = useApi(newProduct)
    const { loading: updating, error: updateError, fetch: updateFetch } = useApi<Product, Product>(updateProduct);
    const navigate = useNavigate();
    const showToast = useToast();


    const onSubmit: SubmitHandler<FormValues> = (data) => {
        fetch(data).promise
            .then(() => {
                showToast(`"${data.name}" se agregó al inventario`);
                navigate("/products");
            })
            .catch(() => {});
    };

    const onEditSubmit: SubmitHandler<FormValues> = (data) => {
        updateFetch({ ...item, ...data }).promise
            .then(() => {
                showToast(`"${data.name}" se actualizó`);
                edited?.();
            })
            .catch(() => {});
    }


    const submitFn = item ? onEditSubmit : onSubmit;

    return (
        <div className="form-container">
            <form className="form surface" onSubmit={handleSubmit(submitFn)}>
                <InputForm name="name" control={control} label="Nombre" type="text" error={errors.name} />
                <InputForm name="price" control={control} label="Precio" type="number" error={errors.price} />
                <InputForm name="stock" control={control} label="Stock" type="number" error={errors.stock} />
                <button type="submit" className="btn btn-primary" disabled={loading || updating}>
                    {item ? "Guardar cambios" : "Crear producto"}
                </button>
                {(loading || updating) && <p className="form-status">Guardando...</p>}
                {error && <p className="form-status text-danger">Error al crear el producto</p>}
                {updateError && <p className="form-status text-danger">Error al guardar los cambios</p>}
            </form>
        </div>
    );
}
