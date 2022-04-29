import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const Privateroute = () => {
    const user = false;

    return user ? <Outlet/> : <Navigate to="/register"/>
}