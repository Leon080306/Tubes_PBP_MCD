import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../components/Layout';

const HomePage = lazy(() => import('../pages/customer/HomePage'));
//const NavBarAdmin = lazy(() => import('../pages/admin/NavBarAdmin'));
const LoginAdmin = lazy(() => import('../pages/admin/LoginPageAdmin'));
const HomePageAdmin = lazy(() => import('../pages/admin/HomePageAdmin'));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                </Route>
                {/* admin */}
                <Route path= '/admin' element={<HomePageAdmin />} />
                <Route path= '/admin/login' element={<LoginAdmin />} />
            </Routes>
        </Suspense>
    );
};