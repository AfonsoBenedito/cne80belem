import { useState } from 'react';
import styles from './Footer.module.css';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <form className={styles.newsletterForm} onSubmit={handleSubmit}>
      <h4 className={styles.heading}>Recebe as nossas notícias</h4>
      <div className={styles.inputGroup}>
        <input
          type="email"
          placeholder="O teu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.emailInput}
        />
        <button type="submit" className={styles.subscribeBtn}>
          Subscrever
        </button>
      </div>
    </form>
  );
}
