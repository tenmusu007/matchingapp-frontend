import React, { useContext } from 'react';
import Chatroom from './pages/Chatroom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { Routes, Route } from 'react-router-dom';
import ChatList from './pages/ChatList';
import Navbar from './components/Navbar';
import { AuthContext } from './AuthContext';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isLogin, isFetching } = useContext(AuthContext);
  // console.log('app isLogin', isLogin);
  // console.log('app isFetching', isFetching);

  if (!isLogin && isFetching) return <Spinner />;

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute isLogin={isLogin}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/chat/room=:id'
          element={
            <ProtectedRoute isLogin={isLogin}>
              <Chatroom />
            </ProtectedRoute>
          }
        />
        <Route
          path='/chat'
          element={
            <ProtectedRoute isLogin={isLogin}>
              <ChatList />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute isLogin={isLogin}>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* <Route path='/profile' element={<Profile />} /> */}

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      {isLogin && <Navbar />}
    </div>
  );
}

export default App;
