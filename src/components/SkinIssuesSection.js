import React, { useState } from 'react';
import styles from './SkinIssuesSection.module.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import placeholderImage from '../assets/skincarelogo.webp'; // Using skincarelogo.webp as the placeholder

import { useCart } from '../contexts/CartContext';

function SkinIssuesSection() {
    const { addToCart } = useCart();
    // State to hold quantities for all products, keyed by productId
    const [quantities, setQuantities] = useState({});

    // State for custom "Add to Cart" confirmation modal
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmModalProduct, setConfirmModalProduct] = useState(null);
    const [confirmModalQuantity, setConfirmModalQuantity] = useState(1); // Quantity to be confirmed in modal

    const navigate = useNavigate(); // Initialize useNavigate

    // Increment quantity for a specific product
    const incrementQuantity = (productId) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 1) + 1, // Default to 1 if not set
        }));
    };

    // Decrement quantity for a specific product
    const decrementQuantity = (productId) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: Math.max(1, (prevQuantities[productId] || 1) - 1), // Ensure quantity doesn't go below 1
        }));
    };

    // handleAddToCart now uses the quantity from the 'quantities' state for the specific product
    const handleAddToCart = (product) => {
        const quantityToAdd = quantities[product.id] || 1; // Get current quantity for this product
        setConfirmModalProduct(product);
        setConfirmModalQuantity(quantityToAdd); // Set quantity for modal
        setShowConfirmModal(true);
    };

    // Functions for custom confirmation modal
    const handleConfirmAddToCart = () => {
        if (confirmModalProduct) {
            addToCart({ ...confirmModalProduct, quantity: confirmModalQuantity }); // Use quantity from modal state
            navigate('/cart'); // Navigate to cart after confirming
        }
        setShowConfirmModal(false);
        setConfirmModalProduct(null);
        // Reset quantity for the specific product that was added
        if (confirmModalProduct) {
            setQuantities(prevQuantities => ({
                ...prevQuantities,
                [confirmModalProduct.id]: 1 // Reset to 1 after adding to cart
            }));
        }
        setConfirmModalQuantity(1); // Reset modal quantity state
    };

    const handleCancelAddToCart = () => {
        if (confirmModalProduct) {
            addToCart({ ...confirmModalProduct, quantity: confirmModalQuantity }); // Still add to cart, but don't navigate
        }
        setShowConfirmModal(false);
        setConfirmModalProduct(null);
        // Reset quantity for the specific product that was added
        if (confirmModalProduct) {
            setQuantities(prevQuantities => ({
                ...prevQuantities,
                [confirmModalProduct.id]: 1 // Reset to 1 after adding to cart
            }));
        }
        setConfirmModalQuantity(1); // Reset modal quantity state
    };

    const skinIssuesData = [
        {
            id: 'acne',
            title: 'Acne',
            description:
                'Acne is a common skin condition characterized by pimples, blackheads, and whiteheads. It occurs when hair follicles become clogged with oil and dead skin cells. Hormonal changes, genetics, and certain medications can contribute to acne. Effective management involves gentle cleansing, targeted treatments with ingredients like salicylic acid and benzoyl peroxide, and non-comedogenic moisturizers.',
            recommendations: [
                { id: 'acne1', name: 'Acne Cleanser', details: 'Gentle cleanser with salicylic acid.', price: 19.99, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 'acne2', name: 'Spot Treatment', details: 'Targets blemishes with benzoyl peroxide.', price: 14.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 'acne3', name: 'Oil-Free Moisturizer', details: 'Hydrates without clogging pores.', price: 24.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 'acne4', name: 'Acne Treatment Serum', details: 'Reduces inflammation and breakouts.', price: 29.75, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 'aging-skin',
            title: 'Aging Skin',
            description:
                'As skin ages, it naturally loses collagen and elastin, leading to wrinkles, fine lines, and loss of firmness. Sun exposure, genetics, and lifestyle factors accelerate this process. A proactive approach includes sun protection, hydrating with rich moisturizers, and incorporating ingredients like retinol, vitamin C, and peptides to support collagen production and reduce signs of aging.',
            recommendations: [
                { id: 'aging1', name: 'Retinol Serum', details: 'Reduces wrinkles and improves skin texture.', price: 39.99, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 'aging2', name: 'Vitamin C Serum', details: 'Brightens skin and provides antioxidant protection.', price: 34.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 'aging3', name: 'Hydrating Night Cream', details: 'Rich cream to nourish and repair skin overnight.', price: 45.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 'aging4', name: 'Peptide Eye Cream', details: 'Firms and reduces fine lines around the eyes.', price: 28.25, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 'rosacea',
            title: 'Rosacea',
            description:
                'Rosacea is a chronic inflammatory skin condition that causes redness, flushing, visible blood vessels, and sometimes small, red bumps. Triggers can include spicy foods, alcohol, temperature extremes, and stress. Management focuses on gentle skincare, identifying and avoiding triggers, and using calming and protective products. Ingredients like niacinamide and azelaic acid can be beneficial.',
            recommendations: [
                { id: 'rosacea1', name: 'Gentle Rosacea Cleanser', details: 'Mild cleanser that won\'t irritate sensitive skin.', price: 21.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 'rosacea2', name: 'Calming Serum', details: 'Reduces redness and soothes inflammation.', price: 31.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 'rosacea3', name: 'Barrier Repair Cream', details: 'Strengthens the skin\'s protective barrier.', price: 36.75, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 'rosacea4', name: 'Azelaic Acid Treatment', details: 'Helps reduce redness and bumps.', price: 26.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 'hyperpigmentation',
            title: 'Hyperpigmentation',
            description:
                'Hyperpigmentation is a condition where patches of skin become darker than the surrounding skin. Common types include sunspots, melasma, and post-inflammatory hyperpigmentation. Sun exposure is a major trigger. Treatment involves sun protection, exfoliants like AHAs and BHAs, and brightening ingredients such as vitamin C, niacinamide, and kojic acid.',
            recommendations: [
                { id: 'hyper1', name: 'Brightening Serum', details: 'Contains Vitamin C and Niacinamide.', price: 42.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 'hyper2', name: 'AHA Exfoliating Lotion', details: 'Helps to shed pigmented skin cells.', price: 38.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 'hyper3', name: 'Sunscreen SPF 50+', details: 'High protection to prevent further darkening.', price: 25.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 'hyper4', name: 'Dark Spot Corrector', details: 'Targets specific areas of hyperpigmentation.', price: 31.25, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Understanding and Managing Skin Issues</h2>
            <nav className={styles.issueNavigation}>
                <ul>
                    {skinIssuesData.map((issue) => (
                        <li key={issue.id}>
                            <a href={`#${issue.id}`}>{issue.title}</a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.issuesContainer}>
                {skinIssuesData.map((issue) => (
                    <section key={issue.id} id={issue.id} className={styles.issueSection}>
                        <h3>{issue.title}</h3>
                        <p className={styles.description}>{issue.description}</p>
                        <div className={styles.productsGrid}>
                            {issue.recommendations.map((product) => (
                                <div key={product.id} className={styles.productCard}>
                                    <div className={styles.imageContainer}>
                                        <img
                                            src={product.imageUrl} // Use specific image URL
                                            alt={product.name}
                                            className={styles.productImage}
                                            onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} // Fallback
                                        />
                                    </div>
                                    <h4>{product.name}</h4>
                                    <p className={styles.productDetails}>{product.details}</p> {/* Display details */}
                                    <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                                    <div className={styles.quantityControl}> {/* Changed from addToCartContainer to quantityControl */}
                                        <button className={styles.quantityButton} onClick={() => decrementQuantity(product.id)}>
                                            -
                                        </button>
                                        <span className={styles.quantity}>
                                            {quantities[product.id] || 1} {/* Display quantity from state */}
                                        </span>
                                        <button className={styles.quantityButton} onClick={() => incrementQuantity(product.id)}>
                                            +
                                        </button>
                                    </div>
                                    <button onClick={() => handleAddToCart(product)} className={styles.addToCartButton}>
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Custom Confirmation Modal for Add to Cart */}
            {showConfirmModal && confirmModalProduct && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <p className={styles.modalMessage}>
                            "{confirmModalProduct.name}" (x{confirmModalQuantity}) added to cart! Do you want to view your cart now?
                        </p>
                        <div className={styles.modalActions}>
                            <button onClick={handleConfirmAddToCart} className={styles.modalConfirmButton}>
                                Yes, View Cart
                            </button>
                            <button onClick={handleCancelAddToCart} className={styles.modalCancelButton}>
                                No, Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SkinIssuesSection;
