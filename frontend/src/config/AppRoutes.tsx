import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import RouteGuard from './RouteGuard';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { authActions } from '../store/authSlice';

const HomePage = lazy(() => import('../pages/customer/HomePage'));
const MenuList = lazy(() => import('../pages/customer/MenuList'));
const Cart = lazy(() => import('../pages/customer/Cart.tsx'));

const LoginAdmin = lazy(() => import('../pages/admin/LoginPageAdmin'));
const ResetPassword = lazy(() => import('../pages/admin/ResetPassword'));
const HomePageAdmin = lazy(() => import('../pages/admin/HomePageAdmin'));
const OrderList = lazy(() => import('../pages/admin/OrderListPage'));
const ListStaff = lazy(() => import('../pages/admin/StaffPage'));
const CreateStaff = lazy(() => import('../pages/admin/CreateStaffPage'));
const EditStaff = lazy(() => import('../pages/admin/EditStaffPage'));
const CreateMenu = lazy(() => import('../pages/admin/CreateMenuPage'));
const CashierPage = lazy(() => import('../pages/cashier/CashierLayout'));
const FormResetPassword = lazy(() => import('../pages/admin/FormResetPassword'));
const OrderMenu = lazy(() => import('../pages/customer/order/OrderMenu'));
const CategoryPage = lazy(() => import('../pages/admin/CategoryPage'));
const CreateCategory = lazy(() => import('../pages/admin/CreateCategoryPage'));
const EditCategory = lazy(() => import('../pages/admin/EditCategoryPage'));

export const AppRoutes = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) return;

        fetch('/api/user/me', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (!res.ok) throw new Error('Invalid token');
                return res.json();
            })
            .then((data) => {
                if (data.user) {
                    dispatch(authActions.setUserInfo(data.user));
                }
            })
            .catch(() => {
                Cookies.remove('token');
            });
    }, [dispatch]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuList />} />
                    <Route path="/order/:cartItemId" element={<OrderMenu />} />
                    <Route path="/cart" element={<Cart />} />
                </Route>

                <Route path='/admin/login' element={<LoginAdmin />} />
                <Route path='/admin/reset-password' element={<ResetPassword />} />
                <Route path='/reset' element={<FormResetPassword />} />

                <Route
                    path='/admin'
                    element={
                        <RouteGuard allowed={["Admin"]}>
                            <HomePageAdmin />
                        </RouteGuard>
                    }
                />
                <Route
                    path='/admin/addMenu'
                    element={
                        <RouteGuard allowed={["Admin"]}>
                            <CreateMenu />
                        </RouteGuard>
                    }
                />
                <Route
                    path='/admin/orderList'
                    element={
                        <RouteGuard allowed={["Admin"]}>
                            <OrderList />
                        </RouteGuard>
                    }
                />
                <Route
                    path='/admin/staffList'
                    element={
                        <RouteGuard allowed={["Admin"]}>
                            <ListStaff />
                        </RouteGuard>
                    }
                />
                <Route
                    path='/staff/create'
                    element={
                        <RouteGuard allowed={["Admin"]}>
                            <CreateStaff />
                        </RouteGuard>
                    }
                />
                <Route
                    path='/staff/edit/:id'
                    element={
                        <RouteGuard allowed={["Admin"]}>
                            <EditStaff />
                        </RouteGuard>
                    }
                />
                <Route
                    path='/category'
                    element={
                        <RouteGuard allowed={["Admin"]}>
                            <CategoryPage />
                        </RouteGuard>
                    }
                />
                <Route
                    path='/category/create'
                    element={
                        <RouteGuard allowed={["Admin"]}>
                            <CreateCategory />
                        </RouteGuard>
                    }
                />
                <Route
                    path='/category/edit/:category_id'
                    element={
                        <RouteGuard allowed={["Admin"]}>
                            <EditCategory />
                        </RouteGuard>
                    }
                />

                <Route
                    path='/cashier'
                    element={
                        <RouteGuard allowed={["Cashier"]}>
                            <CashierPage />
                        </RouteGuard>
                    }
                />
            </Routes>
        </Suspense>
    );
};