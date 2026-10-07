import { useApi } from "../../hook/useApi";
import { deleteProduct, getAllproducts } from "../../service/api.service";
import { Product } from "../../models/product.model";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableProducts from "../../components/Table/TableProducts";
import Modal from "../../components/Modal/Modal";

const ShowProducts = () => {

    const { data, loading, error, fetch } = useApi<Product[], void>(getAllproducts);
    const { fetch : fetchDelete } = useApi<Product, Product>(deleteProduct);

    const [modalProduct, setModalProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch().promise.catch(() => {});
    }, [fetch]);

    const handleUpdate = () => {
        fetch().promise.catch(() => {});
        setModalProduct(null);
    }

    const handleModal = (product: Product) => {
        setModalProduct(product);
    }

    const handleDelete = (product: Product) => {
        fetchDelete(product).promise
            .then(() => fetch().promise)
            .catch(() => {});
    }

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Productos</h1>
                <p>Consultá, editá o eliminá los productos del inventario.</p>
            </header>

            <section className="page-content">
                <div className="products-toolbar">
                    <span>{data && `${data.length} productos`}</span>
                    <Link to="/create" className="btn btn-primary">Agregar producto</Link>
                </div>
                {loading && <p className="texto-fetch">Cargando...</p>}
                {error && <p className="texto-fetch">No se pudieron cargar los productos: {error.message}</p>}
                {data && data.length === 0 && (
                    <div className="surface texto-fetch">Todavía no hay productos cargados.</div>
                )}
                {data && data.length > 0 && <TableProducts items={data} openModal={handleModal} onDelete={handleDelete}/>}
            </section>

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
