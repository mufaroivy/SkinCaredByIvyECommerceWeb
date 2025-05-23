import React from 'react';
import styles from './Product.module.css'; // Import the CSS Module

function Product(props) {
  return (
    <div className={styles.productCard}> {/* Use the styles object */}
      <h3 className={styles.productName}>{props.name}</h3>
      {props.image && <img src={props.image} alt={props.name} className={styles.productImage} />}
      <p className={styles.productPrice}>Price: ${props.price}</p>
      {props.description && <p>{props.description}</p>}
    </div>
  );
}

export default Product;