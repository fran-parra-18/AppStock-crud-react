import { useApi } from "../../hook/useApi";
import { deleteProduct, getAllproducts } from "../../service/api.service";
import { Product } from "../../models/product.model";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableProducts from "../../components/Table/TableProducts";
import Modal from "../../components/Modal/Modal";
import ConfirmDelete from "../../components/Modal/ConfirmDelete";
import { useToast } from "../../components/Toast/useToast";

const ShowProducts = () => {

    const { data, loading, error, fetch } = useApi<Product[], void>(getAllproducts);
    const { loading: deleting, fetch : fetchDelete } = useApi<Product, Product>(deleteProduct);
    const showToast = useToast();

    const [modalProduct, setModalProduct] = useState<Product | null>(null);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [search, setSearch] = useState("");

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

    const handleDelete = () => {
        if (!productToDelete) return;
        const product = productToDelete;
        fetchDelete(product).promise
            .then(() => {
                showToast(`"${product.name}" se eliminó`);
                setProductToDelete(null);
                return fetch().promise;
            })
            .catch(() => {
                showToast(`No se pudo eliminar "${product.name}"`, "danger");
                setProductToDelete(null);
            });
    }

    const term = search.trim().toLowerCase();
    const filtered = data?.filter((p) => p.name.toLowerCase().includes(term)) ?? [];

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Productos</h1>
                <p>Consultá, editá o eliminá los productos del inventario.</p>
            </header>

            <section className="page-content">
                <div className="products-toolbar">
                    <input
                        type="search"
                        className="form-control products-search"
                        placeholder="Buscar por nombre..."
                        aria-label="Buscar por nombre"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span>{data && (term ? `${filtered.length} de ${data.length} productos` : `${data.length} productos`)}</span>
                    <Link to="/create" className="btn btn-primary ms-auto">Agregar producto</Link>
                </div>
                {loading && !data && <p className="texto-fetch">Cargando...</p>}
                {error && <p className="texto-fetch">No se pudieron cargar los productos: {error.message}</p>}
                {data && data.length === 0 && (
                    <div className="surface texto-fetch">Todavía no hay productos cargados.</div>
                )}
                {data && data.length > 0 && filtered.length === 0 && (
                    <div className="surface texto-fetch">Ningún producto coincide con "{search.trim()}".</div>
                )}
                {filtered.length > 0 && (
                    <TableProducts items={filtered} openModal={handleModal} onDelete={setProductToDelete}/>
                )}
            </section>

            {modalProduct &&
                <Modal
                    item={modalProduct}
                    edited={handleUpdate}
                    onClose={() => setModalProduct(null)}
                />
            }
            {productToDelete &&
                <ConfirmDelete
                    item={productToDelete}
                    deleting={deleting}
                    onConfirm={handleDelete}
                    onCancel={() => setProductToDelete(null)}
                />
            }
        </div>
    );
}

export default ShowProducts;
