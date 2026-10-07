import { CustomForm } from '../../components/CustomForm/CustomForm';

const CreateProducts = () => {
    return (
        <div className='page-container'>
            <header className='page-header'>
                <h1>Nuevo producto</h1>
                <p>Completá los datos para sumarlo al inventario.</p>
            </header>
            <section className='page-content'>
                <CustomForm/>
            </section>
        </div>
    );
}

export default CreateProducts;
