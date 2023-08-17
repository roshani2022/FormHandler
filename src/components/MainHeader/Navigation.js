import React from 'react';

import classes from './Navigation.module.css';
import AuthContet from '../../Store/auth-context';

const Navigation = (props) => {
  return (
    <AuthContet.Consumer>
      {(ctx)=>{
        return (
          <nav className={classes.nav}>
          <ul>
            {ctx.isLoggedIn && (
              <li>
                <a href="/">Users</a>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <a href="/">Admin</a>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <button onClick={props.onLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
        )
      }}
    
    </AuthContet.Consumer>
  );
};

export default Navigation;
