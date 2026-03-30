import { lazy } from 'react';
// import { useAppSelector } from '../hooks/useAppSelector';
import { Route, Routes } from 'react-router';

const HomePage = lazy(() => import('../pages/customer/HomePage'));
export const AppRoutes = () => {
    return <Routes>
        <Route path='/' element={<HomePage />} />
    </Routes>
}