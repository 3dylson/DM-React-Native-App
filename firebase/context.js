import * as React from 'react'

// const FirebaseContext = createContext({});

// export const FirebaseProvider = FirebaseContext.Provider;

// export const FirebaseConsumer = FirebaseContext.Consumer;

// export const withFirebaseHOC = Component => props => ( // High Order Component
//     <FirebaseConsumer>
//       {state => <Component {...props} firebase={state} />}
//     </FirebaseConsumer>
//   );

export const user = {
    isLogged: false
};

export const AuthContext = React.createContext({
    user: user,
    //updateUser: () => { }
});

