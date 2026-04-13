import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../components/Layout';

const MenuList = lazy(() => import('../pages/customer/MenuList.tsx'));
const HomePage = lazy(() => import('../pages/customer/HomePage'));
//const NavBarAdmin = lazy(() => import('../pages/admin/NavBarAdmin'));
const LoginAdmin = lazy(() => import('../pages/admin/LoginPageAdmin'));
const HomePageAdmin = lazy(() => import('../pages/admin/HomePageAdmin'));
const OrderList = lazy(() => import('../pages/admin/OrderListPage'));
const ListStaff = lazy(() => import('../pages/admin/StaffPage'));
const CreateStaff = lazy(() => import('../pages/admin/CreateStaffPage'));
const EditStaff = lazy(() => import('../pages/admin/EditStaffPage'));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<MenuList />} />
                </Route>
                {/* admin */}
                <Route path= '/admin' element={<HomePageAdmin />} />
                <Route path= '/admin/login' element={<LoginAdmin />} />
                <Route path= '/admin/orderList' element={<OrderList />} />
                <Route path= '/admin/staffList' element={<ListStaff />} />
                <Route path= '/staff/create' element={<CreateStaff />} />
                <Route path= '/staff/edit/:id' element={<EditStaff />} />
            </Routes>
        </Suspense>
    );
};