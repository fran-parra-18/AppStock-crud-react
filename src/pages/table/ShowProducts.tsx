import { useApi } from "../../hook/useApi";
import { deleteProduct, getAllproducts } from "../../service/api.service";
import { Product } from "../../models/product.model";
import { useEffect, useState } from "react";
import TableProducts from "../../components/Table/TableProducts";
import Modal from "../../components/Modal/Modal";



const ShowProducts = () => {

    const { data, loading, error, fetch } = useApi<Product[], void>(getAllproducts);
    const { fetch : fetchDelete } = useApi<Product, Product>(deleteProduct);

    const [modalProduct, setModalProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch();
    }, [fetch]);

    const handleUpdate = () => {
        fetch();
        setModalProduct(null);
    }

    const handleModal = (product: Product) => {
        setModalProduct(product);
    }

    const handleDelete = (product: Product) => {
        fetchDelete(product).promise
            .then(() => fetch())
            .catch(() => {});
    }


    return (
        <div className="show-products-container page-container">
            <h1 className='title'>Lista de productos</h1>
            {loading && <p className="texto-fetch">Cargando...</p>}
            {error && <p className="texto-fetch">Error: {error.message}</p>}
            {data && <TableProducts items={data} openModal={handleModal} onDelete={handleDelete}/>}
            {modalProduct &&
                <Modal
                    item={modalProduct}
                    edited={handleUpdate}
                    onClose={() => setModalProduct(null)}
                />
            }
        </div>
    );
}

export default ShowProducts;
