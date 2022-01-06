import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { firebase } from '../firebase/firebase-config';
import { loadingNotes } from '../slice/noteSlice';
import { userActions } from '../slice/usersSlice';
import { JournalScreen } from './../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(
          userActions.login({
            uid: user.uid,
            name: user.displayName,
          })
        );
        setIsLoggedIn(true);
        dispatch(loadingNotes({ id: user.uid }));
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch]);

  if (checking) {
    return <h1>Loading...</h1>;
  }
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path='/auth/*'
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <AuthRouter />
              </PublicRoute>
            }
          />
          <Route
            path='/'
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <JournalScreen />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
