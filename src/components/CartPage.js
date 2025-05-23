import React, { useState } from 'react';
import styles from './CartPage.module.css';
import { useCart } from '../contexts/CartContext';
import placeholderImage from '../assets/skincarelogo.webp'; // Import placeholder image

function CartPage() {
  const { cart, setCart: updateCartContext, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [allowSelection, setAllowSelection] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [buyItemsClicked, setBuyItemsClicked] = useState(false);

  const handleToggleSelection = (productId) => {
    if (allowSelection) {
      if (selectedProducts.includes(productId)) {
        setSelectedProducts(selectedProducts.filter(id => id !== productId));
        setSelectAll(false);
      } else {
        setSelectedProducts([...selectedProducts, productId]);
        if (selectedProducts.length + 1 === cart.length) {
          setSelectAll(true);
        }
      }
    }
  };

  const handleSelectAll = () => {
    if (allowSelection) {
      if (!selectAll) {
        setSelectedProducts(cart.map(item => item.id));
      } else {
        setSelectedProducts([]);
      }
      setSelectAll(!selectAll);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, Math.max(1, parseInt(newQuantity) || 1));
  };

  const handleBuyItemsClick = () => {
    setAllowSelection(true);
    setBuyItemsClicked(true);
  };

  const handleContinueToPayment = () => {
    if (selectedProducts.length > 0) {
      setShowPaymentOptions(true);
    } else {
      alert('Please select items to buy before proceeding to payment.');
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    if (paymentMethod) {
      const remainingCart = cart.filter(item => !selectedProducts.includes(item.id));
      updateCartContext(remainingCart);
      setSelectedProducts([]);
      setSelectAll(false);
      setShowPaymentOptions(false);
      setAllowSelection(false);
      setBuyItemsClicked(false);
      setPaymentMethod(null);
      alert('Thank you for shopping with us at SkinCaredByIvy. Read the customer service manual for more information.');
    } else {
      alert('Please select a payment method.');
    }
  };

  const handleCancelPayment = () => {
    setShowPaymentOptions(false);
    setAllowSelection(false);
    setBuyItemsClicked(false);
    setPaymentMethod(null);
    setSelectedProducts([]);
    setSelectAll(false);
  };

  const isItemSelected = (productId) => selectedProducts.includes(productId);

  const getSelectedTotal = () => {
    return cart
      .filter(item => selectedProducts.includes(item.id))
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const shippingFeePercentage = 0.25;
  const selectedTotal = parseFloat(getSelectedTotal());
  const shippingFee = (selectedTotal * shippingFeePercentage).toFixed(2);
  const finalTotal = (selectedTotal + parseFloat(shippingFee)).toFixed(2);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className={styles.productList}>
            {cart.map(item => (
              <div key={item.id} className={styles.productCard}>
                <input
                  type="checkbox"
                  checked={isItemSelected(item.id)}
                  onChange={() => handleToggleSelection(item.id)}
                  disabled={!allowSelection}
                />
                <div className={styles.imagePlaceholder}>
                  <img src={item.image || placeholderImage} alt={item.name} className={styles.productImage} />
                </div>
                <div className={styles.cardBody}>
                  <h5 className={styles.productName}>{item.name}</h5>
                  <p className={styles.productPrice}>${item.price ? parseFloat(item.price).toFixed(2) : 'N/A'}</p>
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className={styles.quantityInput}
                    />
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <strong>Total Price: ${getTotalPrice()}</strong>
          </div>

          <div className={styles.buyControls}>
            {!buyItemsClicked && (
              <button className={styles.buyButton} onClick={handleBuyItemsClick}>
                Buy Items
              </button>
            )}
            {allowSelection && (
              <>
                <button className={styles.continuePaymentButton} onClick={handleContinueToPayment}>
                  Continue to Payment
                </button>
                <div className={styles.selectAllContainer}>
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                  <label>Select All</label>
                </div>
              </>
            )}
          </div>

          {showPaymentOptions && (
            <div className={styles.paymentPopupContainer}>
              <h3>Choose Payment Method</h3>
              <div className={styles.paymentMethods}>
                <button
                  className={paymentMethod === 'EcoCash' ? styles.selected : ''}
                  onClick={() => handlePaymentMethodSelect('EcoCash')}
                >
                  EcoCash
                </button>
                <button
                  className={paymentMethod === 'Innbucks' ? styles.selected : ''}
                  onClick={() => handlePaymentMethodSelect('Innbucks')}
                >
                  Innbucks
                </button>
                <button
                  className={paymentMethod === 'Credit/Debit Card' ? styles.selected : ''}
                  onClick={() => handlePaymentMethodSelect('Credit/Debit Card')}
                >
                  Credit/Debit Card
                </button>
                <button
                  className={paymentMethod === 'PayPal' ? styles.selected : ''}
                  onClick={() => handlePaymentMethodSelect('PayPal')}
                >
                  PayPal
                </button>
                <button
                  className={`${styles.amazonPayButton} ${paymentMethod === 'AmazonPay' ? styles.selected : ''}`}
                  onClick={() => handlePaymentMethodSelect('AmazonPay')}
                >
                  AmazonPay
                </button>
              </div>
              <div className={styles.paymentSummary}>
                <strong>Selected Total: ${getSelectedTotal()}</strong>
                <strong>Shipping Fee (25%): ${shippingFee}</strong>
                <strong>Final Total: ${finalTotal}</strong>
              </div>
              <div className={styles.paymentControls}>
                <button className={styles.confirmPaymentButton} onClick={handleConfirmPayment}>
                  Confirm Payment
                </button>
                <button className={styles.cancelPaymentButton} onClick={handleCancelPayment}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CartPage;