import { usePage } from '@inertiajs/react';
import DataTable from 'react-data-table-component';

const LogDataTablePage = () => {
    const { logs } = usePage().props;

    // استخراج البيانات والصفحات
    const { data, current_page, last_page, per_page, total } = logs;

    const columns = [
        { name: 'Product', selector: (row) => row.product_name, sortable: true },
        { name: 'Location', selector: (row) => row.location_name, sortable: true },
        { name: 'Old Quantity', selector: (row) => row.old_quantity, sortable: true },
        { name: 'New Quantity', selector: (row) => row.new_quantity, sortable: true },
        { name: 'Reason', selector: (row) => row.adjustment_reason, sortable: true },
        {
            name: 'Adjustment Date',
            selector: (row) => new Date(row.adjustment_date).toLocaleString(),
            sortable: true,
        },
        {
            name: 'Logged At',
            selector: (row) => new Date(row.created_at).toLocaleString(),
            sortable: true,
        },
    ];

    // دالة لتغيير الصفحة
    const handlePageChange = (page) => {
        Inertia.get(route('logs.index'), { page }); // تمرير رقم الصفحة للروت
    };

    return (
        <div>
            <DataTable
                title="Logs"
                columns={columns}
                data={data} // تمرير البيانات المستخرجة
                pagination
                paginationServer // للتصفح على الخادم
                paginationTotalRows={total} // إجمالي السجلات
                paginationPerPage={per_page} // عدد السجلات في كل صفحة
                paginationDefaultPage={current_page} // الصفحة الحالية
                onChangePage={handlePageChange} // عند تغيير الصفحة
                highlightOnHover
            />
        </div>
    );
};

export default LogDataTablePage;
