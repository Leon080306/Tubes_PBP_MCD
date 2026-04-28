import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../components/Layout';

const MenuList = lazy(() => import('../pages/customer/MenuList.tsx'));
const OrderMenu = lazy(() => import('../pages/customer/order/OrderMenu'));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<MenuList />} />
                    <Route path="/order/:cartItemId" element={<OrderMenu />} />
                </Route>
            </Routes>
        </Suspense>
    );
};