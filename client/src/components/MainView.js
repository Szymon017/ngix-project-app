// App.js
import React from 'react';
import UsersList from './UsersList';
import CarsList from './CarsList';
import LoginForm from './LoginForm'
function MainView() {
  return (
    <div>

      <div>
        <UsersList />
        <CarsList />
      </div>
    </div>
  );
}

export default MainView;
