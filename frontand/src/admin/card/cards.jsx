import React, { useEffect, useState } from 'react';
import Card from './card';
import styles from './card.module.css';

const Cards = ({ onCardClick, onCardClick1, onCardClick2,onCardClick3,onCardClick4 }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/auth/getAdminPendingUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(response => response.json())
      .then(data => setUsers(data.users))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className={styles.cardsWrapper}>
      <div className={styles.statsCardsWrapper}>
        <Card
          value={users.length}
          title="User Request"
          description="More info"
          cardClass={styles.cardPrimaryContainer} // Use a primary color like blue
          onClick={onCardClick}  
        />
        <Card
          title="Notice Board"
          description="More info"
          cardClass={styles.cardSuccessContainer} // Use a success color like green
          onClick={onCardClick1} 
        />
        <Card
          title="Advisor List"
          description="More info"
          cardClass={styles.cardWarningContainer} // Use a warning color like yellow
          onClick={onCardClick2} 
        />
        <Card
          title="Upload Result"
          description="More info"
          cardClass={styles.cardInfoContainer} // Use an info color like light blue
          onClick={onCardClick3} 
        />
        <Card
          title="Add Teacher"
          description="More info"
          cardClass={styles.cardDangerContainer} // Use a danger color like red
          onClick={onCardClick4} 
        />
      </div>
    </div>
  );
};

export default Cards;
