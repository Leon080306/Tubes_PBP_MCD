import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../components/Layout';

const HomePage = lazy(() => import('../pages/customer/HomePage'));
const MenuList = lazy(() => import('../pages/customer/MenuList'));
const Cart = lazy(() => import('../pages/customer/Cart.tsx'));

//const NavBarAdmin = lazy(() => import('../pages/admin/NavBarAdmin'));
const LoginAdmin = lazy(() => import('../pages/admin/LoginPageAdmin'));
const ResetPassword = lazy(() => import('../pages/admin/ResetPassword'));
const HomePageAdmin = lazy(() => import('../pages/admin/HomePageAdmin'));
const OrderList = lazy(() => import('../pages/admin/OrderListPage'));
const ListStaff = lazy(() => import('../pages/admin/StaffPage'));
const CreateStaff = lazy(() => import('../pages/admin/CreateStaffPage'));
const EditStaff = lazy(() => import('../pages/admin/EditStaffPage'));
const CreateMenu = lazy(() => import('../pages/admin/CreateMenuPage'));
const CashierPage = lazy(() => import('../pages/admin/CashierPage'));
const FormResetPassword = lazy(() => import('../pages/admin/FormResetPassword'));
const OrderMenu = lazy(() => import('../pages/customer/order/OrderMenu'));
const CategoryPage = lazy(() => import('../pages/admin/CategoryPage'));
const CreateCategory = lazy(() => import('../pages/admin/CreateCategoryPage'));
const EditCategory = lazy(() => import('../pages/admin/EditCategoryPage'));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuList />} />
                    <Route path="/order/:cartItemId" element={<OrderMenu />} />
                    <Route path="/cart" element={<Cart />} />
                </Route>
                {/* admin */}
                <Route path='/admin' element={<HomePageAdmin />} />
                <Route path='/admin/addMenu' element={<CreateMenu />} />
                <Route path='/admin/login' element={<LoginAdmin />} />
                <Route path='/admin/reset-password' element={<ResetPassword />} />
                <Route path='/admin/orderList' element={<OrderList />} />
                <Route path='/admin/staffList' element={<ListStaff />} />
                <Route path='/staff/create' element={<CreateStaff />} />
                <Route path='/staff/edit/:id' element={<EditStaff />} />
                <Route path='/cashier' element={<CashierPage />} />
                <Route path='/reset' element={<FormResetPassword />} />
                <Route path='/category' element={<CategoryPage />} />
                <Route path='/category/create' element={<CreateCategory />} />
                <Route path='/category/edit/:category_id' element={<EditCategory />} />
            </Routes>
        </Suspense>
    );
};