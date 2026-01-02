import AdminLayout from "../../components/admin/AdminLayout";

export const metadata = {
    title: "Darté. - Admin",
    description: "Darté. - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
