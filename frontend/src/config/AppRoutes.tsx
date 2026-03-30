import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../components/Layout';

const HomePage = lazy(() => import('../pages/customer/HomePage'));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                </Route>
            </Routes>
        </Suspense>
    );
};