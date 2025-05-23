import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AccountPage.module.css';
import {
    FaUser,
    FaMapMarkerAlt,
    FaShoppingCart,
    FaCreditCard,
    FaSignOutAlt,
    FaEdit,
    FaSave,
    FaEye,
    FaEyeSlash,
    FaPlus,
    FaTrash, // Added FaTrash for delete functionality
    FaHome,
    FaList,
} from 'react-icons/fa';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '../lib/utils';

import { useAuth } from '../contexts/AuthContext';

// Mock order and cart data
const getMockOrders = (userId) => [
    {
        id: '1',
        userId,
        date: '2024-07-20',
        status: 'Delivered',
        total: 120.00,
        items: [
            { id: 'p1', name: 'Product 1', quantity: 2, price: 20 },
            { id: 'p2', name: 'Product 2', quantity: 1, price: 80 },
        ],
    },
    {
        id: '2',
        userId,
        date: '2024-07-10',
        status: 'Shipped',
        total: 250.00,
        items: [
            { id: 'p3', name: 'Product 3', quantity: 1, price: 100 },
            { id: 'p4', name: 'Product 4', quantity: 3, price: 50 },
        ],
    },
    {
        id: '3',
        userId,
        date: '2024-08-01',
        status: 'Delivered',
        total: 50.00,
        items: [
            { id: 'p5', name: 'Product 5', quantity: 2, price: 25 },
        ],
    },
];

const getMockCart = (userId) => [
    { id: 'p1', name: 'Product 1', quantity: 2, price: 20 },
    { id: 'p2', name: 'Product 2', quantity: 1, price: 80 },
];

const AccountPage = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [isEditingAddress, setIsEditingAddress] = useState(null); // Index of address being edited
    const [editedAddress, setEditedAddress] = useState({ street: '', city: '', state: '', zip: '', country: '' });
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [isEditingPaymentMethod, setIsEditingPaymentMethod] = useState(null); // Index of payment method being edited
    const [editedPaymentMethod, setEditedPaymentMethod] = useState({ id: '', type: '', last4: '', expDate: '' });
    const [cart, setCart] = useState([]); // This state is not directly used in this component, but kept for context

    // State for custom confirmation modal
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmModalMessage, setConfirmModalMessage] = useState('');
    const [onConfirmAction, setOnConfirmAction] = useState(null); // Function to execute on confirm

    const navigate = useNavigate();
    const { getLoggedInUser, logout, updateUser } = useAuth();

    useEffect(() => {
        const loggedInUserData = getLoggedInUser();
        if (loggedInUserData) {
            setUser(loggedInUserData);
            setEditedUser(loggedInUserData);
            setAddresses([
                loggedInUserData.shippingAddress,
                loggedInUserData.billingAddress
            ].filter(Boolean)); // Filter out null/undefined if addresses might be missing
            setOrders(getMockOrders(loggedInUserData.email));
            setCart(getMockCart(loggedInUserData.email));
            setPaymentMethods([
                { id: 'pm1', type: 'Visa', last4: '4242', expDate: '12/26' },
                { id: 'pm2', type: 'Mastercard', last4: '5555', expDate: '08/25' },
            ]);
        } else {
            navigate('/login');
        }
    }, [getLoggedInUser, navigate]);

    if (!user) {
        return (
            <div className={styles.loadingContainer}>
                <p>Loading account details...</p>
            </div>
        );
    }

    const handleInputChange = (e) => setEditedUser({ ...editedUser, [e.target.name]: e.target.value });

    const handleSave = () => {
        updateUser(editedUser);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditedUser(user);
    };

    const handleCancel = () => setIsEditing(false);

    // --- Custom Confirmation Modal Logic ---
    const confirmAction = (message, action) => {
        setConfirmModalMessage(message);
        setOnConfirmAction(() => action); // Wrap action in a function to prevent immediate execution
        setShowConfirmModal(true);
    };

    const handleConfirm = () => {
        if (onConfirmAction) {
            onConfirmAction();
        }
        setShowConfirmModal(false);
        setConfirmModalMessage('');
        setOnConfirmAction(null);
    };

    const handleCancelConfirm = () => {
        setShowConfirmModal(false);
        setConfirmModalMessage('');
        setOnConfirmAction(null);
    };
    // --- End Custom Confirmation Modal Logic ---

    const handleLogout = () => {
        confirmAction('Are you sure you want to log out?', () => {
            logout();
            navigate('/login');
        });
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);

    // Address functions
    const handleEditAddress = (index) => {
        setIsEditingAddress(index);
        setEditedAddress(addresses[index]);
    };

    const handleSaveAddress = (index) => {
        const updatedAddresses = [...addresses];
        updatedAddresses[index] = editedAddress;
        setAddresses(updatedAddresses);
        // In a real app, you'd also update this via AuthContext or backend
        // updateUser({ addresses: updatedAddresses }); // Example if addresses are part of user object
        setIsEditingAddress(null);
    };

    const handleCancelAddress = () => {
        setIsEditingAddress(null);
    };

    const handleAddAddress = () => {
        setAddresses([
            ...addresses,
            { street: '', city: '', state: '', zip: '', country: '' },
        ]);
        setIsEditingAddress(addresses.length); // Start editing the newly added address
    };

    const handleDeleteAddress = (indexToDelete) => {
        confirmAction('Are you sure you want to delete this address?', () => {
            const updatedAddresses = addresses.filter((_, index) => index !== indexToDelete);
            setAddresses(updatedAddresses);
            // In a real app, you'd also update this via AuthContext or backend
            // updateUser({ addresses: updatedAddresses }); // Example if addresses are part of user object
            if (isEditingAddress === indexToDelete) {
                setIsEditingAddress(null); // Stop editing if the deleted address was being edited
            }
            console.log(`Address at index ${indexToDelete} deleted.`);
        });
    };

    // Payment method functions
    const handleEditPaymentMethod = (index) => {
        setIsEditingPaymentMethod(index);
        setEditedPaymentMethod(paymentMethods[index]);
    };

    const handleSavePaymentMethod = (index) => {
        const updatedPaymentMethods = [...paymentMethods];
        updatedPaymentMethods[index] = editedPaymentMethod;
        setPaymentMethods(updatedPaymentMethods);
        // In a real app, you'd update this via backend API
        setIsEditingPaymentMethod(null);
    };

    const handleCancelPaymentMethod = () => {
        setIsEditingPaymentMethod(null);
    };

    const handleDeletePaymentMethod = (idToDelete) => {
        confirmAction('Are you sure you want to delete this payment method?', () => {
            const updatedPaymentMethods = paymentMethods.filter((method) => method.id !== idToDelete);
            setPaymentMethods(updatedPaymentMethods);
            if (isEditingPaymentMethod !== null && paymentMethods[isEditingPaymentMethod]?.id === idToDelete) {
                 setIsEditingPaymentMethod(null); // Stop editing if the deleted method was being edited
            }
            console.log(`Payment method ${idToDelete} deleted.`);
        });
    };

    const handleAddPaymentMethod = () => {
        setPaymentMethods([
            ...paymentMethods,
            { id: `pm${Date.now()}`, type: '', last4: '', expDate: '' }, // Use Date.now() for unique ID
        ]);
        setIsEditingPaymentMethod(paymentMethods.length); // Start editing the new payment method
    };


    return (
        <div className={styles.accountPage}>
            <div className={styles.accountSidebar}>
                <h2 className={styles.sidebarTitle}>My Account</h2>
                <ul className={styles.sidebarNav}>
                    <li>
                        <a href="#dashboard" className={styles.sidebarLink}>
                            <FaUser className={styles.sidebarIcon} />
                            Account Overview
                        </a>
                    </li>
                    <li>
                        <a href="#orders" className={styles.sidebarLink}>
                            <FaShoppingCart className={styles.sidebarIcon} />
                            Order History
                        </a>
                    </li>
                    <li>
                        <a href="#details" className={styles.sidebarLink}>
                            <FaEdit className={styles.sidebarIcon} />
                            Account Details
                        </a>
                    </li>
                    {/* Wishlist section removed */}
                    <li>
                        <a href="#payment" className={styles.sidebarLink}>
                            <FaCreditCard className={styles.sidebarIcon} />
                            Payment Methods
                        </a>
                    </li>
                    <li>
                        <a href="#addresses" className={styles.sidebarLink}>
                            <FaMapMarkerAlt className={styles.sidebarIcon} />
                            Addresses
                        </a>
                    </li>
                    <li>
                        <button onClick={handleLogout} className={styles.logoutButton}>
                            <FaSignOutAlt className={styles.sidebarIcon} />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
            <div className={styles.accountContent}>
                <section id="dashboard" className={styles.accountSection}>
                    <h2 className={styles.sectionTitle}>Account Overview</h2>
                    <p className={styles.welcomeMessage}>
                        Welcome, {user.firstName} {user.lastName}!
                    </p>
                    <div className={styles.accountSummary}>
                        <p>
                            <strong>Name:</strong> {user.firstName} {user.lastName}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <Link to="#details" className={styles.editProfileLink}>
                            Edit Profile
                        </Link>
                    </div>
                </section>

                <section id="orders" className={styles.accountSection}>
                    <h2 className={styles.sectionTitle}>Order History</h2>
                    {orders.length > 0 ? (
                        <div className={styles.orderList}>
                            {orders
                                .filter((order) => order.userId === user.email)
                                .map((order) => (
                                    <div key={order.id} className={styles.orderItem}>
                                        <p>
                                            <strong>Order #:</strong> {order.id}
                                        </p>
                                        <p>
                                            <strong>Date:</strong> {order.date}
                                        </p>
                                        <p>
                                            <strong>Status:</strong> {order.status}
                                        </p>
                                        <p>
                                            <strong>Total:</strong> ${order.total.toFixed(2)}
                                        </p>
                                        <p>
                                            <strong>Items:</strong>
                                        </p>
                                        <ul>
                                            {order.items.map((item) => (
                                                <li key={item.id}>
                                                    {item.name} ({item.quantity}) - ${item.price.toFixed(2)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p>No orders found.</p>
                    )}
                </section>

                <section id="details" className={styles.accountSection}>
                    <h2 className={styles.sectionTitle}>Account Details</h2>
                    {isEditing ? (
                        <div className={styles.editForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="firstName">First Name</label>
                                <Input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={editedUser.firstName || ''}
                                    onChange={handleInputChange}
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="lastName">Last Name</label>
                                <Input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={editedUser.lastName || ''}
                                    onChange={handleInputChange}
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={editedUser.email || ''}
                                    onChange={handleInputChange}
                                    className={styles.inputField}
                                    readOnly
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="password">Password</label>
                                <div className={styles.passwordInputContainer}>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        onChange={handleInputChange}
                                        className={styles.inputField}
                                    />
                                    <button
                                        type="button"
                                        className={styles.passwordToggleButton}
                                        onClick={toggleShowPassword}
                                        title={showPassword ? 'Hide Password' : 'Show Password'}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div className={styles.formActions}>
                                <Button onClick={handleSave} className={styles.saveButton}>
                                    <FaSave className={styles.saveIcon} />
                                    Save Changes
                                </Button>
                                <Button onClick={handleCancel} className={styles.cancelButton}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.profileInfo}>
                            <p>
                                <strong>First Name:</strong> {user.firstName}
                            </p>
                            <p>
                                <strong>Last Name:</strong> {user.lastName}
                            </p>
                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>
                            <Button onClick={handleEdit} className={`${styles.editButton} ${styles.profileEditButton}`}>
                                <FaEdit className={styles.editIcon} />
                                Edit Profile
                            </Button>
                        </div>
                    )}
                </section>

                <section id="payment" className={styles.accountSection}>
                    <h2 className={styles.sectionTitle}>Payment Methods</h2>
                    {paymentMethods.length > 0 ? (
                        <div className={styles.paymentList}>
                            {paymentMethods.map((method, index) => (
                                <div
                                    key={method.id}
                                    className={styles.paymentItem}
                                >
                                    {isEditingPaymentMethod === index ? (
                                        <div className={styles.paymentEditForm}>
                                            <Input
                                                type="text"
                                                value={editedPaymentMethod.type || ''}
                                                onChange={(e) =>
                                                    setEditedPaymentMethod({
                                                        ...editedPaymentMethod,
                                                        type: e.target.value,
                                                    })
                                                }
                                                placeholder="Card Type"
                                                className={styles.inputField}
                                            />
                                            <Input
                                                type="text"
                                                value={editedPaymentMethod.last4 || ''}
                                                onChange={(e) =>
                                                    setEditedPaymentMethod({
                                                        ...editedPaymentMethod,
                                                        last4: e.target.value,
                                                    })
                                                }
                                                placeholder="Last 4 Digits"
                                                className={styles.inputField}
                                            />
                                            <Input
                                                type="text"
                                                value={editedPaymentMethod.expDate || ''}
                                                onChange={(e) =>
                                                    setEditedPaymentMethod({
                                                        ...editedPaymentMethod,
                                                        expDate: e.target.value,
                                                    })
                                                }
                                                placeholder="MM/YY"
                                                className={styles.inputField}
                                            />
                                            <div className={styles.paymentActions}>
                                                <Button onClick={() => handleSavePaymentMethod(index)} className={styles.saveButton}>
                                                    Save
                                                </Button>
                                                <Button onClick={handleCancelPaymentMethod} className={styles.cancelButton}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className={styles.paymentDisplay}>
                                                <p>
                                                    <strong>Type:</strong> {method.type}
                                                </p>
                                                <p>
                                                    <strong>Last 4 Digits:</strong> {method.last4}
                                                </p>
                                                <p>
                                                    <strong>Expiration:</strong> {method.expDate}
                                                </p>
                                            </div>
                                            <div className={styles.paymentActions}>
                                                <Button
                                                    className={styles.editButton}
                                                    onClick={() => handleEditPaymentMethod(index)}
                                                >
                                                    <FaEdit className={styles.buttonIcon} /> Edit
                                                </Button>
                                                <Button
                                                    className={styles.deleteButton}
                                                    onClick={() => handleDeletePaymentMethod(method.id)}
                                                >
                                                    <FaTrash className={styles.buttonIcon} /> Delete
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                            <Button onClick={handleAddPaymentMethod} className={styles.addPaymentButton}>
                                <FaPlus className={styles.buttonIcon} /> Add New Payment Method
                            </Button>
                        </div>
                    ) : (
                        <p>No payment methods on file. <Button onClick={handleAddPaymentMethod} className={styles.addPaymentButton}>
                            <FaPlus className={styles.buttonIcon} /> Add New Payment Method
                        </Button></p>
                    )}
                </section>

                <section id="addresses" className={styles.accountSection}>
                    <h2 className={styles.sectionTitle}>Addresses</h2>
                    {addresses.map((address, index) => (
                        <div key={index} className={styles.addressCard}>
                            {isEditingAddress === index ? (
                                <div className={styles.addressEditForm}>
                                    <h3>
                                        {index === 0 ? 'Shipping Address' : 'Billing Address'}
                                    </h3>
                                    <Input
                                        type="text"
                                        value={editedAddress.street || ''}
                                        onChange={(e) =>
                                            setEditedAddress({
                                                ...editedAddress,
                                                street: e.target.value,
                                            })
                                        }
                                        placeholder="Street"
                                        className={styles.inputField}
                                    />
                                    <Input
                                        type="text"
                                        value={editedAddress.city || ''}
                                        onChange={(e) =>
                                            setEditedAddress({
                                                ...editedAddress,
                                                city: e.target.value,
                                            })
                                        }
                                        placeholder="City"
                                        className={styles.inputField}
                                    />
                                    <Input
                                        type="text"
                                        value={editedAddress.state || ''}
                                        onChange={(e) =>
                                            setEditedAddress({
                                                ...editedAddress,
                                                state: e.target.value,
                                            })
                                        }
                                        placeholder="State"
                                        className={styles.inputField}
                                    />
                                    <Input
                                        type="text"
                                        value={editedAddress.zip || ''}
                                        onChange={(e) =>
                                            setEditedAddress({
                                                ...editedAddress,
                                                zip: e.target.value,
                                            })
                                        }
                                        placeholder="ZIP Code"
                                        className={styles.inputField}
                                    />
                                    <Input
                                        type="text"
                                        value={editedAddress.country || ''}
                                        onChange={(e) =>
                                            setEditedAddress({
                                                ...editedAddress,
                                                country: e.target.value,
                                            })
                                        }
                                        placeholder="Country"
                                        className={styles.inputField}
                                    />
                                    <div className={styles.addressActions}>
                                        <Button onClick={() => handleSaveAddress(index)} className={styles.saveButton}>Save</Button>
                                        <Button onClick={handleCancelAddress} className={styles.cancelButton}>Cancel</Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3>
                                        {index === 0 ? 'Shipping Address' : 'Billing Address'}
                                    </h3>
                                    <p>{address.street}</p>
                                    <p>
                                        {address.city}, {address.state} {address.zip}
                                    </p>
                                    <p>{address.country}</p>
                                    <div className={styles.addressActions}>
                                        <Button
                                            onClick={() => handleEditAddress(index)}
                                            className={styles.editButton}
                                        >
                                            <FaEdit className={styles.buttonIcon} /> Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteAddress(index)}
                                            className={styles.deleteButton}
                                        >
                                            <FaTrash className={styles.buttonIcon} /> Delete
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                    <Button onClick={handleAddAddress} className={styles.addAddressButton}>
                        <FaPlus className={styles.buttonIcon} /> Add New Address
                    </Button>
                </section>
            </div>

            {/* Custom Confirmation Modal */}
            {showConfirmModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <p className={styles.modalMessage}>{confirmModalMessage}</p>
                        <div className={styles.modalActions}>
                            <Button onClick={handleConfirm} className={styles.modalConfirmButton}>
                                Confirm
                            </Button>
                            <Button onClick={handleCancelConfirm} className={styles.modalCancelButton}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountPage;
