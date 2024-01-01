import { Navigate, Route, Routes } from 'react-router-dom';
import { Board, Home, Login, ProtectedRoute } from '@screens';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path='/boards/:boardId' element={<ProtectedRoute><Board /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
};

export default Router;
