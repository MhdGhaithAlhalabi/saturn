import { Link, usePage } from '@inertiajs/react';
import withAuthorization from '../../Components/withAuthorization';
import DataTablePage from '../../Components/Tables/DataTable';
import CreateProductModal from '@/Pages/Products/CreateProduct';



const ProductsIndex = () => {
    const { products } = usePage().props;


    return (
        <>
        <CreateProductModal></CreateProductModal>
        <DataTablePage {...products}></DataTablePage>
        </>
    );
};


export default withAuthorization(ProductsIndex, ["view item"]);

