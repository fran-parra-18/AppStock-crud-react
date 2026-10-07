import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hook/useApi';
import { getAllproducts } from '../../service/api.service';
import { LOW_STOCK, Product } from '../../models/product.model';
import { formatCurrency } from '../../utils/format';
import './Home.css'

export default function Home() {
    const { data, loading, error, fetch } = useApi<Product[], void>(getAllproducts);

    useEffect(() => {
        fetch().promise.catch(() => {});
    }, [fetch]);

    const products = data ?? [];
    const totalUnits = products.reduce((sum, p) => sum + Number(p.stock), 0);
    const totalValue = products.reduce((sum, p) => sum + Number(p.price) * Number(p.stock), 0);
    const lowStock = products
        .filter((p) => Number(p.stock) <= LOW_STOCK)
        .sort((a, b) => Number(a.stock) - Number(b.stock));

    const stats = [
        { label: 'Productos', value: products.length },
        { label: 'Unidades en stock', value: totalUnits },
        { label: 'Valor del inventario', value: formatCurrency(totalValue) },
        { label: `Con stock bajo (≤ ${LOW_STOCK})`, value: lowStock.length },
    ];

    return (
        <div className='page-container'>
            <section className='page-header home-hero'>
                <h1>App Stock</h1>
                <p>Controlá el inventario de tu tienda: cargá productos, actualizá precios y stock, y detectá rápido lo que hay que reponer.</p>
                <div className='home-actions'>
                    <Link to='/products' className='btn btn-primary btn-lg'>Ver productos</Link>
                    <Link to='/create' className='btn btn-outline-light btn-lg'>Agregar producto</Link>
                </div>
            </section>

            <section className='page-content'>
                <h2>Resumen del inventario</h2>
                {loading && <p className='texto-fetch'>Cargando...</p>}
                {error && <p className='texto-fetch'>No se pudo cargar el inventario: {error.message}</p>}

                {data && (
                    <>
                        <div className='home-stats'>
                            {stats.map((stat) => (
                                <div key={stat.label} className='surface'>
                                    <span className='home-stat-value'>{stat.value}</span>
                                    <span className='home-stat-label'>{stat.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className='surface home-low-stock'>
                            <h3>Para reponer</h3>
                            {lowStock.length === 0 ? (
                                <p>Todos los productos tienen stock suficiente.</p>
                            ) : (
                                <ul>
                                    {lowStock.map((p) => (
                                        <li key={p.id}>
                                            <span>{p.name}</span>
                                            <span className={Number(p.stock) === 0 ? 'badge bg-danger' : 'badge bg-warning text-dark'}>
                                                {Number(p.stock) === 0 ? 'Sin stock' : `${p.stock} u.`}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <Link to='/products'>Ir a la lista de productos →</Link>
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}
