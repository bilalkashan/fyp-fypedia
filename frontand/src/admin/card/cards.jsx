import React, { useEffect, useState } from 'react';
import Card from './card';
import styles from './card.module.css';

const Cards = ({
  onCardClick, onCardClick1, onCardClick2, onCardClick3, onCardClick4,
  onCardClick01, onCardClick02, onCardClick03,
  role
}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (role === 'admin') {
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
    }
  }, [role]);

  return (
    <div className={styles.cardsWrapper}>
      <div className={styles.statsCardsWrapper}>
        {role === 'admin' && (
          <>
            <Card
              value={users.length}
              title="User Request"
              description="More info"
              cardClass={styles.cardPrimaryContainer}
              onClick={onCardClick}
            />
            <Card
              title="Notice Board"
              description="More info"
              cardClass={styles.cardSuccessContainer}
              onClick={onCardClick1}
            />
            <Card
              title="Advisor List"
              description="More info"
              cardClass={styles.cardWarningContainer}
              onClick={onCardClick2}
            />
            <Card
              title="Upload Result"
              description="More info"
              cardClass={styles.cardInfoContainer}
              onClick={onCardClick3}
            />
            <Card
              title="Add Teacher"
              description="More info"
              cardClass={styles.cardDangerContainer}
              onClick={onCardClick4}
            />
          </>
        )}

        {role === 'teacher' && (
          <>
            <Card
              title="My Dashboard"
              description="Go to Dashboard"
              cardClass={styles.cardPrimaryContainer}
              onClick={onCardClick01}
            />
            <Card
              title="My Slots"
              description="View Slots"
              cardClass={styles.cardSuccessContainer}
              onClick={onCardClick02}
            />
            <Card
              title="Slot Requests"
              description="Manage Requests"
              cardClass={styles.cardInfoContainer}
              onClick={onCardClick03}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Cards;