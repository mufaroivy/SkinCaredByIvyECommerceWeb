import React, { useState } from 'react';
import styles from './SkinTypeSection.module.css';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import placeholderLogo from '../assets/skincarelogo.webp'; // Your original skincare logo for fallback

// Use your actual logo as the fallback image
const FALLBACK_IMAGE = placeholderLogo;

// Mock product data now nested by Skin Type -> Category -> Products
const mockProducts = {
    "Oily": {
        "Cleansers": [
            { id: 'oily-c1', name: 'Purifying Gel Cleanser', price: 24.50, imageUrl: "https://images.unsplash.com/photo-1556910651-7f8365851608?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Deeply cleanses and controls excess oil without stripping skin.' },
            { id: 'oily-c2', name: 'Foaming Salicylic Cleanser', price: 26.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Targets breakouts and blackheads, promoting clear skin.' },
            { id: 'oily-c3', name: 'Oil Control Face Wash', price: 22.99, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Reduces surface oil and minimizes shine throughout the day.' },
            { id: 'oily-c4', name: 'Gentle Clarifying Cleanser', price: 21.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Removes impurities and balances skin pH without irritation.' },
        ],
        "Toners": [
            { id: 'oily-t1', name: 'Pore Minimizing Toner', price: 18.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Refines pores and balances skin after cleansing.' },
            { id: 'oily-t2', name: 'Astringent Toner', price: 19.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Helps to tighten pores and control excess oil.' },
            { id: 'oily-t3', name: 'Tea Tree Purifying Toner', price: 17.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Calms and clarifies blemish-prone oily skin.' },
            { id: 'oily-t4', name: 'Mattifying Mist Toner', price: 20.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Provides a refreshing matte finish throughout the day.' },
        ],
        "Moisturizers": [
            { id: 'oily-m1', name: 'Lightweight Hydrator', price: 28.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Provides essential moisture with a non-greasy matte finish.' },
            { id: 'oily-m2', name: 'Oil-Free Gel Moisturizer', price: 29.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Absorbs quickly, keeping skin hydrated and shine-free.' },
            { id: 'oily-m3', name: 'Balancing Fluid Moisturizer', price: 30.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Regulates sebum production for a balanced complexion.' },
            { id: 'oily-m4', name: 'Water-Based Hydrating Lotion', price: 27.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Light yet effective hydration for daily use on oily skin.' },
        ],
        "Sunscreens": [
            { id: 'oily-s1', name: 'Matte Finish SPF 30', price: 25.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Provides broad-spectrum protection with an invisible matte finish.' },
            { id: 'oily-s2', name: 'Oil Control Sunscreen SPF 50', price: 30.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'High protection, controls shine, and won\'t clog pores.' },
            { id: 'oily-s3', name: 'Mineral Sunscreen for Oily Skin', price: 28.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Lightweight, non-comedogenic mineral SPF.' },
            { id: 'oily-s4', name: 'Tinted Matte Sunscreen', price: 32.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Evens skin tone while providing SPF protection.' },
        ],
        "Serums": [
            { id: 'oily-ser1', name: 'Niacinamide Serum 10%', price: 32.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Reduces pore appearance and evens skin tone.' },
            { id: 'oily-ser2', name: 'Salicylic Acid Serum', price: 29.99, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Targets breakouts and blackheads for clearer skin.' },
            { id: 'oily-ser3', name: 'Zinc & PCA Serum', price: 27.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Helps control sebum and reduce skin imperfections.' },
            { id: 'oily-ser4', name: 'Mandelic Acid Serum', price: 31.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Gentle exfoliant for oily and acne-prone skin.' },
        ],
    },
    "Dry": {
        "Cleansers": [
            { id: 'dry-c1', name: 'Creamy Hydrating Wash', price: 26.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Gently cleanses while maintaining skin’s natural moisture barrier.' },
            { id: 'dry-c2', name: 'Soothing Milk Cleanser', price: 24.99, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Removes impurities and makeup, leaving skin soft.' },
            { id: 'dry-c3', name: 'Hydrating Oil Cleanser', price: 27.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Dissolves dirt and grime without drying out the skin.' },
            { id: 'dry-c4', name: 'Balm Cleanser for Dry Skin', price: 29.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Nourishes and deeply cleanses, suitable for very dry skin.' },
        ],
        "Toners": [
            { id: 'dry-t1', name: 'Hydrating Rose Water Toner', price: 21.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Soothes and hydrates, preparing skin for next steps.' },
            { id: 'dry-t2', name: 'Ceramide Barrier Toner', price: 25.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Replenishes lipids and strengthens skin barrier.' },
            { id: 'dry-t3', name: 'Glycerin-Rich Facial Toner', price: 19.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Attracts moisture to the skin for lasting hydration.' },
            { id: 'dry-t4', name: 'Calming Chamomile Toner', price: 20.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Reduces redness and discomfort in dry, sensitive skin.' },
        ],
        "Moisturizers": [
            { id: 'dry-m1', name: 'Rich Barrier Repair Cream', price: 45.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Restores and strengthens compromised skin barrier.' },
            { id: 'dry-m2', name: 'Intense Hydration Cream', price: 40.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Provides long-lasting comfort and hydration for very dry skin.' },
            { id: 'dry-m3', name: 'Overnight Nourishing Mask', price: 38.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Deeply moisturizes and revitalizes skin while you sleep.' },
            { id: 'dry-m4', name: 'Protective Day Cream SPF 20', price: 36.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Hydrates and protects against environmental damage.' },
        ],
        "Sunscreens": [
            { id: 'dry-s1', name: 'Hydrating Sunscreen SPF 50', price: 30.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Offers high protection with added moisturizing benefits.' },
            { id: 'dry-s2', name: 'Mineral Sunscreen for Dry Skin', price: 28.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Gentle, non-irritating formula for sensitive, dry skin.' },
            { id: 'dry-s3', name: 'Tinted Hydrating SPF', price: 32.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Evens skin tone while providing essential sun protection and moisture.' },
            { id: 'dry-s4', name: 'Body Sunscreen Lotion SPF 30', price: 24.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Hydrating and protective sunscreen for the entire body.' },
        ],
        "Serums": [
            { id: 'dry-ser1', name: 'Hyaluronic Acid Booster', price: 38.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Delivers intense hydration and plumps fine lines.' },
            { id: 'dry-ser2', name: 'Squalane Facial Oil', price: 30.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Nourishes and softens dry, flaky skin.' },
            { id: 'dry-ser3', name: 'Vitamin E Hydrating Serum', price: 33.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Rich in antioxidants, promotes skin healing and hydration.' },
            { id: 'dry-ser4', name: 'Omega Fatty Acid Serum', price: 37.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Restores skin barrier function and reduces dryness.' },
        ],
    },
    "Combination": {
        "Cleansers": [
            { id: 'combi-c1', name: 'Balancing Foaming Cleanser', price: 23.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Effectively cleanses both oily and dry areas.' },
            { id: 'combi-c2', name: 'Gel-to-Foam Cleanser', price: 21.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Transforms on skin to remove impurities and balance.' },
            { id: 'combi-c3', name: 'Mild Clay Cleanser', price: 24.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Detoxifies oily zones while maintaining hydration in dry areas.' },
            { id: 'combi-c4', name: 'Daily Balancing Wash', price: 22.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Suitable for daily use, keeping skin fresh and balanced.' },
        ],
        "Toners": [
            { id: 'combi-t1', name: 'Glycolic Acid Toner', price: 29.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Exfoliates and refines texture, suitable for uneven skin.' },
            { id: 'combi-t2', name: 'Dual-Phase Balancing Toner', price: 27.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Shake to activate, balances and hydrates combination skin.' },
            { id: 'combi-t3', name: 'Pore Refining Essence', price: 30.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Minimizes the look of pores in oily zones.' },
            { id: 'combi-t4', name: 'Hyaluronic & B5 Toner', price: 26.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Provides lightweight hydration and soothes all areas of the face.' },
        ],
        "Moisturizers": [
            { id: 'combi-m1', name: 'Adaptive Moisturizer', price: 35.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Hydrates dry zones and minimizes oiliness in T-zone.' },
            { id: 'combi-m2', name: 'Hydra-Matte Cream', price: 33.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Provides balanced hydration with a comfortable matte finish.' },
            { id: 'combi-m3', name: 'Light Balancing Lotion', price: 31.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Perfect for daily use, keeps combination skin in harmony.' },
            { id: 'combi-m4', name: 'Fluid Hydrator', price: 30.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Non-comedogenic formula providing moisture without heaviness.' },
        ],
        "Sunscreens": [
            { id: 'combi-s1', name: 'Hybrid SPF 40', price: 29.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Combines mineral and chemical filters for balanced protection.' },
            { id: 'combi-s2', name: 'Gel Sunscreen SPF 50', price: 32.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Lightweight gel texture, ideal for combination skin.' },
            { id: 'combi-s3', name: 'Invisible Sunscreen SPF 30', price: 26.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Blends seamlessly without leaving a white cast.' },
            { id: 'combi-s4', name: 'Daily Facial SPF 25', price: 24.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Lightweight and non-greasy, perfect for everyday protection.' },
        ],
        "Serums": [
            { id: 'combi-ser1', name: 'Balancing Niacinamide Serum', price: 32.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Regulates oil and improves skin texture for combination skin.' },
            { id: 'combi-ser2', name: 'Salicylic Acid & Hyaluronic Acid Serum', price: 31.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Targets blemishes while providing essential hydration.' },
            { id: 'combi-ser3', name: 'Green Tea Antioxidant Serum', price: 28.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Protects skin from environmental damage and soothes.' },
            { id: 'combi-ser4', name: 'Clarifying & Hydrating Serum', price: 29.50, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Addresses both oily and dry concerns in one formula.' },
        ],
    },
    "Normal": {
        "Cleansers": [
            { id: 'normal-c1', name: 'Gentle Daily Cleanser', price: 20.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Maintains skin’s natural balance and freshness.' },
            { id: 'normal-c2', name: 'Foaming Cream Cleanser', price: 21.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Effectively removes impurities without stripping moisture.' },
            { id: 'normal-c3', name: 'Hydrating Gel Cleanser', price: 22.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Leaves skin feeling clean, soft, and refreshed.' },
            { id: 'normal-c4', name: 'Micellar Cleansing Water', price: 18.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Effortlessly removes makeup and impurities without rinsing.' },
        ],
        "Toners": [
            { id: 'normal-t1', name: 'Balancing Floral Toner', price: 20.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Hydrates and rebalances skin after cleansing.' },
            { id: 'normal-t2', name: 'pH Balancing Toner', price: 19.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Restores optimal skin pH for better product absorption.' },
            { id: 'normal-t3', name: 'Antioxidant Face Mist', price: 23.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Refreshes and protects skin throughout the day.' },
            { id: 'normal-t4', name: 'Prebiotic Hydrating Toner', price: 24.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Supports a healthy skin microbiome for balanced skin.' },
        ],
        "Moisturizers": [
            { id: 'normal-m1', name: 'Hydrating Gel-Cream', price: 30.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Lightweight, non-greasy hydration for everyday use.' },
            { id: 'normal-m2', name: 'Daily Revitalizing Cream', price: 32.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Keeps normal skin supple and radiant throughout the day.' },
            { id: 'normal-m3', name: 'Antioxidant Day Cream', price: 35.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Protects and hydrates for a healthy glow.' },
            { id: 'normal-m4', name: 'Nourishing Night Cream', price: 38.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Replenishes and repairs skin overnight.' },
        ],
        "Sunscreens": [
            { id: 'normal-s1', name: 'Broad Spectrum SPF 30', price: 25.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Daily sun protection without a white cast.' },
            { id: 'normal-s2', name: 'Lightweight Facial SPF 50', price: 30.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'High protection, comfortable for all-day wear.' },
            { id: 'normal-s3', name: 'Invisible Daily Sunscreen', price: 27.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Absorbs quickly, leaving no residue, perfect under makeup.' },
            { id: 'normal-s4', name: 'Mineral Sunscreen SPF 40', price: 29.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Gentle, broad-spectrum mineral protection for sensitive skin.' },
        ],
        "Serums": [
            { id: 'normal-ser1', name: 'Vitamin C Brightening Serum', price: 42.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Boosts radiance and provides antioxidant protection.' },
            { id: 'normal-ser2', name: 'Hyaluronic Acid Serum', price: 38.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Intensely hydrates and plumps skin for a smoother look.' },
            { id: 'normal-ser3', name: 'Retinol Complex Serum', price: 48.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Promotes skin renewal and reduces signs of aging.' },
            { id: 'normal-ser4', name: 'Peptide Firming Serum', price: 45.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Improves skin elasticity and reduces the appearance of fine lines.' },
        ],
    },
    // ADDED: "All" category to display a mix or specific general products across categories
    "All": {
        "Recommended": [ // You can categorize 'All' as well
            { id: 'all1', name: 'Universal Micellar Water', price: 15.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Gentle makeup remover and cleanser for all skin types.' },
            { id: 'all2', name: 'Soothing Aloe Vera Gel', price: 12.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Calms and hydrates irritated skin.' },
            { id: 'all3', name: 'Detoxifying Charcoal Mask', price: 21.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Purifies pores and refreshes complexion.' },
            { id: 'all4', name: 'Rosehip Oil Elixir', price: 39.00, imageUrl: "https://images.unsplash.com/photo-1629161205166-41829e1c4e97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: 'Rich in antioxidants, promotes skin regeneration.' },
        ]
    }
};

function SkinTypeSection({ skinType }) {
    const skinTypeCategories = mockProducts[skinType] || {};

    const displayCategories = ['Cleansers', 'Toners', 'Moisturizers', 'Sunscreens', 'Serums'];

    const { addToCart } = useCart();
    const navigate = useNavigate();

    // NEW: State to hold quantities for all products, keyed by productId
    const [quantities, setQuantities] = useState({});

    // State for custom "Add to Cart" confirmation modal
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmModalProduct, setConfirmModalProduct] = useState(null);
    const [confirmModalQuantity, setConfirmModalQuantity] = useState(1); // CORRECTED: Re-added this useState declaration

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

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{skinType} Skin Products</h2>

            {displayCategories.map(category => {
                const productsForCategory = skinTypeCategories[category] || [];
                if (productsForCategory.length === 0) return null;

                return (
                    <div key={category} className={styles.categorySection}>
                        <h3 className={styles.categoryTitle}>{category}</h3>
                        <div className={styles.productList}>
                            {productsForCategory.map((product) => (
                                <div key={product.id} className={styles.productCard}>
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className={styles.productImage}
                                        onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                                    />
                                    <div className={styles.cardBody}>
                                        <h5 className={styles.productName}>{product.name}</h5>
                                        <p className={styles.productDescription}>{product.description}</p>
                                        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                                        {/* MODIFIED: Use global quantities state and pass productId to handlers */}
                                        <div className={styles.quantityControl}>
                                            <button className={styles.quantityButton} onClick={() => decrementQuantity(product.id)}>-</button>
                                            <span className={styles.quantity}>{quantities[product.id] || 1}</span> {/* Display quantity from state */}
                                            <button className={styles.quantityButton} onClick={() => incrementQuantity(product.id)}>+</button>
                                        </div>
                                        <button className={styles.addToCartButton} onClick={() => handleAddToCart(product)}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

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

export default SkinTypeSection;
