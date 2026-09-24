import { useState, useEffect, useRef } from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import styles from './Footer.module.css';

const FORMSPREE_URL = 'https://formspree.io/f/mpqoggqp';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');
  // Only a rejected address marks the field invalid; a network or server failure doesn't
  const [emailRejected, setEmailRejected] = useState(false);
  const successRef = useRef(null);
  const focusWasInForm = useRef(false);

  // The form is replaced on success; move focus to the message so keyboard and screen-reader
  // users keep their place and hear it. Mouse users' focus was never in the form.
  useEffect(() => {
    if (status === 'success' && focusWasInForm.current) successRef.current?.focus();
  }, [status]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'submitting') return;
    focusWasInForm.current = e.currentTarget.contains(document.activeElement);

    // Honeypot: bots fill every field, people never see this one
    if (e.currentTarget.elements._gotcha.value) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    setError('');
    setEmailRejected(false);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: '📰 Nova subscrição da newsletter',
          email: email.trim(),
        }),
      });
      if (res.ok) {
        setStatus('success');
      } else if (res.status === 429) {
        setStatus('error');
        setError('Demasiados pedidos. Espera um minuto e tenta outra vez.');
      } else if (res.status === 400 || res.status === 422) {
        setStatus('error');
        setEmailRejected(true);
        setError('Este email não foi aceite. Confirma se está bem escrito e tenta outra vez.');
      } else {
        setStatus('error');
        setError('Não foi possível subscrever agora, por um problema do nosso lado. Tenta outra vez daqui a pouco.');
      }
    } catch {
      setStatus('error');
      setError('Sem ligação à internet. O teu email ficou guardado - tenta outra vez.');
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.newsletterForm}>
        <h2 className={styles.heading}>Recebe as nossas notícias</h2>
        <p className={styles.formStatus} role="status" tabIndex={-1} ref={successRef}>
          <FaCheckCircle size="1.15em" className={styles.statusIcon} aria-hidden="true" />
          <span>Subscrição recebida. Obrigado!</span>
        </p>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form className={styles.newsletterForm} onSubmit={handleSubmit} aria-labelledby="newsletter-heading">
      <h2 className={styles.heading} id="newsletter-heading">Recebe as nossas notícias</h2>      <label htmlFor="newsletter-email" className={styles.srOnly}>
        Email para receber as notícias do agrupamento
      </label>
      <div className={styles.inputGroup}>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="O teu email"
          maxLength={254}
          value={email}
          onChange={(e) => {
            e.target.setCustomValidity('');
            setEmail(e.target.value);
          }}
          // The browser's own message follows the browser's language, not the page's
          onInvalid={(e) => {
            const { validity } = e.target;
            e.target.setCustomValidity(
              validity.valueMissing
                ? 'Escreve o teu email para subscrever.'
                : 'Este email parece incompleto. Confirma se tem @ e um domínio (ex.: nome@exemplo.pt).'
            );
          }}
          required
          aria-invalid={emailRejected || undefined}
          aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
          className={styles.emailInput}
        />
        {/* aria-disabled, not disabled: a disabled button drops keyboard focus to the page */}
        <button
          type="submit"
          className={styles.subscribeBtn}
          aria-disabled={submitting || undefined}
          aria-busy={submitting || undefined}
        >
          {submitting ? 'A enviar…' : 'Subscrever'}
        </button>
      </div>
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className={styles.srOnly}
        aria-hidden="true"
      />
      <div aria-live="polite">
        {status === 'error' && (
          <p className={`${styles.formStatus} ${styles.formStatusError}`} id="newsletter-error">
            <FaExclamationCircle size="1.15em" className={styles.statusIcon} aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}
      </div>
    </form>
  );
}
