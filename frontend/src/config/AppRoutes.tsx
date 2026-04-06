import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../components/Layout';

const MenuList = lazy(() => import('../pages/customer/MenuList.tsx'));
const HomePage = lazy(() => import('../pages/customer/HomePage'));
const OrderMenuPage = lazy(() => import('../pages/customer/OrderMenuPage'));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<MenuList />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/order/:id" element={<OrderMenuPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
};