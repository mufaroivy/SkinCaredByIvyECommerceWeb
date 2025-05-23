import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const DEVICE_USER_MAP_KEY = 'skinCaredByIvyAuth';
const USERS_KEY = 'skinCaredByIvyUsers'; // For simulating user registration

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [authData, setAuthData] = useState(() => {
        try {
            const storedAuthData = localStorage.getItem(DEVICE_USER_MAP_KEY);
            return storedAuthData ? JSON.parse(storedAuthData) : {};
        } catch (error) {
            console.error('Error loading auth data from local storage', error);
            return {};
        }
    });
    const [users, setUsers] = useState(() => {
        try {
            const storedUsers = localStorage.getItem(USERS_KEY);
            // Initialize with a default mock user if no users exist
            const initialUsers = storedUsers ? JSON.parse(storedUsers) : [];
            if (initialUsers.length === 0) {
                // Add a default user for easy testing if no users are registered
                return [{
                    id: 'user-default',
                    firstName: 'Default',
                    lastName: 'User',
                    email: 'default@example.com',
                    password: 'password', // In a real app, hash this!
                    shippingAddress: { street: '123 Test St', city: 'Testville', state: 'TS', zip: '10001', country: 'Testland' },
                    billingAddress: { street: '123 Test St', city: 'Testville', state: 'TS', zip: '10001', country: 'Testland' }
                }];
            }
            return initialUsers;
        } catch (error) {
            console.error('Error loading users from local storage', error);
            return [];
        }
    });

    // Effect to persist authData to localStorage
    useEffect(() => {
        localStorage.setItem(DEVICE_USER_MAP_KEY, JSON.stringify(authData));
    }, [authData]);

    // Effect to persist users to localStorage
    useEffect(() => {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }, [users]);

    // Effect to set currentUser based on authData on initial load
    useEffect(() => {
        const deviceId = getDeviceId(); // Ensure deviceId is consistent
        const userId = authData[deviceId];
        if (userId) {
            const foundUser = users.find(u => u.id === userId);
            if (foundUser) {
                setCurrentUser({ ...foundUser, deviceId });
            }
        }
    }, [authData, users]); // Depend on authData and users to re-evaluate currentUser

    const register = async (fullName, email, password) => {
        if (users.some(user => user.email === email)) {
            throw new Error('Email address already in use.');
        }
        const newUser = {
            id: 'user-' + Math.random().toString(36).substring(2, 15),
            firstName: fullName.split(' ')[0], // Get first name
            lastName: fullName.split(' ').slice(1).join(' ') || '', // Get last name(s)
            email,
            password, // In a real app, hash this!
            // Default addresses for new users
            shippingAddress: { street: '', city: '', state: '', zip: '', country: '' },
            billingAddress: { street: '', city: '', state: '', zip: '', country: '' }
        };
        setUsers(prevUsers => [...prevUsers, newUser]);
        return newUser;
    };

    const login = async (email, password) => {
        const user = users.find(u => u.email === email && u.password === password); // In real app, compare hashed password
        if (user) {
            const deviceId = getDeviceId();
            setAuthData(prevAuthData => ({
                ...prevAuthData,
                [deviceId]: user.id,
            }));
            setCurrentUser({ ...user, deviceId }); // Set currentUser with deviceId
            return true;
        } else {
            throw new Error('Invalid email or password');
        }
    };

    const logout = async () => {
        const deviceIdToRemove = getDeviceId();
        setAuthData(prevAuthData => {
            const { [deviceIdToRemove]: removed, ...rest } = prevAuthData;
            return rest;
        });
        setCurrentUser(null);
    };

    const isAuthenticated = () => !!currentUser;

    const getDeviceId = () => {
        // A simple way to get a consistent device ID for this session
        let deviceId = sessionStorage.getItem('deviceId');
        if (!deviceId) {
            deviceId = 'device-' + Math.random().toString(36).substring(2, 15);
            sessionStorage.setItem('deviceId', deviceId);
        }
        return deviceId;
    };

    const getLoggedInUser = () => currentUser;

    // --- CORRECTED AND REFINED updateUser FUNCTION ---
    const updateUser = (updatedUserData) => {
        if (!currentUser) {
            console.error("Cannot update user: No current user logged in.");
            return;
        }

        // 1. Create the new current user object by merging
        const newCurrentUser = { ...currentUser, ...updatedUserData };

        // 2. Update the 'users' array to reflect changes for this user
        // This is crucial for persistence when using `users` as your mock backend
        setUsers(prevUsers => {
            const userIndex = prevUsers.findIndex(u => u.id === newCurrentUser.id);
            if (userIndex > -1) {
                const updatedUsers = [...prevUsers];
                updatedUsers[userIndex] = newCurrentUser;
                return updatedUsers;
            }
            console.warn("User not found in users array during update. This might indicate a data inconsistency.");
            return prevUsers; // Should not happen if logged in
        });

        // 3. Update the currentUser state in the context
        setCurrentUser(newCurrentUser);

        console.log('User data updated in AuthContext:', newCurrentUser);
    };
    // --- END CORRECTED updateUser FUNCTION ---

    const value = {
        currentUser,
        register,
        login,
        logout,
        isAuthenticated,
        getLoggedInUser,
        updateUser, // <--- MAKE SURE updateUser IS INCLUDED HERE
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
