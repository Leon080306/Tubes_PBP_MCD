import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../components/Layout';

const MenuList = lazy(() => import('../pages/customer/MenuList.tsx'));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<MenuList />} />
                </Route>
            </Routes>
        </Suspense>
    );
};