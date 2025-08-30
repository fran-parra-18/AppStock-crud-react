import { SubmitHandler, useForm } from "react-hook-form";
import InputForm from "./components/CustomInput";
import { FormValues, schema } from "./models";
import { yupResolver } from "@hookform/resolvers/yup";
import { newProduct, updateProduct } from "../../service/api.service";
import { emptyProduct, Product } from "../../models/product.model";
import "./CustomeFrom.css"

import { useApi } from "../../hook/useApi";

interface CustomFormProps {
    item?: Product;
    edited?: () => void;
}


export const CustomForm = ({ item, edited }: CustomFormProps) => {

    let initialvalues = {}

    if (item) {
        initialvalues = item;
    } else {
        initialvalues = emptyProduct;
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: "onBlur",
        defaultValues: initialvalues
    });

    const { data, loading, error, fetch } = useApi(newProduct)
    const { fetch: updateFetch } = useApi<Product, Product>(updateProduct);


    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        fetch(data)
        reset();
    };

    const onEditSubmit: SubmitHandler<FormValues> = async (data) => {
        updateFetch(data).promise.then(() => {
        edited?.();
        })
    }


    const submitFn = item ? onEditSubmit : onSubmit;

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit(submitFn)}>
                <InputForm name="name" control={control} label="Nombre" type="text" error={errors.name} />
                <InputForm name="price" control={control} label="Precio" type="number" error={errors.price} />
                <InputForm name="stock" control={control} label="Stock" type="number" error={errors.stock} />
                <button type="submit">Enviar</button>
                {loading && <p>Enviando...</p>}
                {data && <p>Producto creado</p>}
                {error && <p>Error al crear el producto</p>}
            </form>
        </div>
    );
}





