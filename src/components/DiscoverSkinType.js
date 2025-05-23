import React, { useState, useRef } from 'react';
import styles from './DiscoverSkinType.module.css';
import { Link } from 'react-router-dom';

function DiscoverSkinType() {
  const [answers, setAnswers] = useState({});
  const [skinType, setSkinType] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const questionnaireRef = useRef(null);

  const discoveryParagraph = (
    <>
      Understanding your skin type is the first step towards a healthy and radiant complexion. Our skin can generally be categorized into oily, dry, combination, and normal. Each type has unique characteristics and requires specific care.{' '}
      If you have skin issues such as <Link to="/skin-issues" className={styles.link}>acne, aging skin, and rosacea</Link>, visit our skin issues page.
    </>
  );

  const questions = [
    { id: 1, text: 'Does your skin appear shiny or greasy, especially on your forehead and nose?', type: 'oily' },
    { id: 2, text: 'Do you experience dryness or tightness, particularly after washing your face?', type: 'dry' },
    { id: 3, text: 'Is your T-zone (forehead, nose, and chin) noticeably oilier than the rest of your face?', type: 'combination' },
    { id: 4, text: 'After cleansing, does your skin feel comfortable without needing extra hydration?', type: 'normal' },
    { id: 5, text: 'Do you frequently need to blot away excess oil throughout the day?', type: 'oily' },
    { id: 6, text: 'Does your skin sometimes feel rough or flaky?', type: 'dry' },
    { id: 7, text: 'Do you struggle to find a moisturizer that keeps your skin hydrated without feeling greasy?', type: 'combination' },
    { id: 8, text: 'Do you rarely experience noticeable skin issues such as excessive dryness or oiliness?', type: 'normal' },
    { id: 9, text: 'Does your skin produce excess oil within two hours of cleansing?', type: 'oily' },
    { id: 10, text: 'Do you see visible flakes or dry patches even after applying moisturizer?', type: 'dry' },
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const calculateSkinType = () => {
    if (Object.keys(answers).length !== questions.length) {
      setErrorMessage('Please answer all questions.');
      setShowResult(false);
      setSkinType(null);
      questionnaireRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setErrorMessage('');
    const oilyScore = questions.filter(q => answers[q.id] === 'yes' && q.type === 'oily').length;
    const dryScore = questions.filter(q => answers[q.id] === 'yes' && q.type === 'dry').length;
    const normalScore = questions.filter(q => answers[q.id] === 'yes' && q.type === 'normal').length;
    const combinationScore = questions.filter(q => answers[q.id] === 'yes' && q.type === 'combination').length;

    if (oilyScore > dryScore && oilyScore > normalScore && oilyScore >= combinationScore) {
      setSkinType('Oily');
    } else if (dryScore > oilyScore && dryScore > normalScore && dryScore >= combinationScore) {
      setSkinType('Dry');
    } else if (normalScore > oilyScore && normalScore > dryScore && normalScore >= combinationScore) {
      setSkinType('Normal');
    } else if (combinationScore > oilyScore && combinationScore > dryScore && combinationScore >= normalScore) {
      setSkinType('Combination');
    } else {
      setSkinType('Uncertain');
    }
    setShowResult(true);
  };

  const skinTypeDescriptions = {
    Oily: "Oily skin needs lightweight, non-comedogenic products to control shine and prevent breakouts. Look for cleansers with salicylic acid and moisturizers that are oil-free and mattifying. Regular exfoliation is key to keep pores clear.",
    Dry: "Dry skin requires rich, hydrating products to replenish moisture and prevent flakiness. Gentle cleansers, hydrating serums with hyaluronic acid, and thick, emollient moisturizers are essential. Avoid harsh exfoliants and hot water.",
    Normal: "Normal skin is well-balanced and can tolerate a wider range of products. Focus on maintaining this balance with gentle cleansers, hydrating moisturizers, and broad-spectrum SPF. Regular skincare is about prevention and nourishment.",
    Combination: "Combination skin needs a balanced approach, addressing both oily and dry areas. You might need to use different products on different parts of your face. Look for gentle, balancing cleansers and lightweight moisturizers, and consider targeted treatments for oily zones.",
    Uncertain: "It's difficult to determine your skin type based on your answers. Consider consulting a dermatologist or trying a wider range of product samples to see how your skin reacts."
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Discover Your Skin Type</h2>
      <p className={styles.paragraph}>{discoveryParagraph}</p>

      <div ref={questionnaireRef} className={styles.questionnaire}>
        <h3>Answer the following questions:</h3>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {questions.map(question => (
          <div key={question.id} className={styles.question}>
            <p>{question.text}</p>
            <div className={styles.answerOptions}>
              <button
                className={`${styles.answerButton} ${styles.yesButton} ${answers[question.id] === 'yes' ? styles.selected : ''}`}
                onClick={() => handleAnswer(question.id, 'yes')}
              >
                Yes
              </button>
              <button
                className={`${styles.answerButton} ${styles.noButton} ${answers[question.id] === 'no' ? styles.selected : ''}`}
                onClick={() => handleAnswer(question.id, 'no')}
              >
                No
              </button>
            </div>
          </div>
        ))}
        <button onClick={calculateSkinType} className={styles.submitButton}>Calculate My Skin Type</button>
      </div>

      {showResult && skinType && (
        <div className={styles.result}>
          <h3>Your Likely Skin Type: <span className={styles[`skinType${skinType.replace(' ', '')}`]}>{skinType}</span></h3>
          <p>{skinTypeDescriptions[skinType]}</p>
          {skinType === 'Dry' && (
            <p>Explore our specially formulated products for dry skin to bring back hydration and comfort. <Link to="/dry" className={styles.productLink}>View Dry Skin Products</Link></p>
          )}
          {skinType === 'Oily' && (
            <p>Discover our range of oil-control products designed to keep your skin balanced and shine-free. <Link to="/oily" className={styles.productLink}>View Oily Skin Products</Link></p>
          )}
          {skinType === 'Combination' && (
            <p>Find products that cater to both oily and dry areas for a harmonious complexion. <Link to="/combination" className={styles.productLink}>View Combination Skin Products</Link></p>
          )}
          {skinType === 'Normal' && (
            <p>Maintain your skin's healthy balance with our gentle and nourishing products. <Link to="/normal" className={styles.productLink}>View Normal Skin Products</Link></p>
          )}
        </div>
      )}
    </div>
  );
}

export default DiscoverSkinType;