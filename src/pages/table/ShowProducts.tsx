import { useApi } from "../../hook/useApi";
import { deleteProduct, getAllproducts } from "../../service/api.service";
import { emptyProduct, Product } from "../../models/product.model";
import { useEffect, useState } from "react";
import TableProducts from "../../components/Table/TableProducts";
import Modal from "../../components/Modal/Modal";



const ShowProducts = () => {

    const { data, loading, error, fetch } = useApi<Product[], void>(getAllproducts);
    const { fetch : fetchDelete } = useApi<Product, Product>(deleteProduct);

    const [modal, setModal] = useState(false);
    const [modalProduct, setModalProduct] = useState<Product>(emptyProduct);

    useEffect(() => {
        fetch();
    }, [fetch]);

    const handleUpdate = () => {
        fetch();
        setModal(false);
    }

    const handleModal = (product: Product) => {
        setModal(true);
        setModalProduct(product);
    }

    const handleDelete = (product: Product) => {
        fetchDelete(product).promise.then(() => {
            fetch();
        });
    }


    return (
        <div className="show-products-container page-container">
            <h1 className='title'>Lista de productos</h1>
            {loading && <p className="texto-fetch">Cargando...</p>}
            {error && <p className="texto-fetch">Error: {error.message}</p>}
            {data && <TableProducts items={data} openModal={handleModal} onDelete={handleDelete}/>}
            {modal && modalProduct &&
                <Modal
                    item={modalProduct}
                    edited={handleUpdate}
                    onClose={() => setModal(false)}
                />
            }
        </div>
    );
}

export default ShowProducts;
