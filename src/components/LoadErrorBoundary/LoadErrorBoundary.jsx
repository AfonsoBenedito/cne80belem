import { Component } from 'react';
import { FaRedo } from 'react-icons/fa';
import styles from './LoadErrorBoundary.module.css';

// A lazy part of the site that fails to download (no signal, or a deploy since the page opened:
// the old chunk files are gone from GitHub Pages) would leave a blank screen. This shows what
// happened and a reload instead; React keeps a failed lazy import, so only a reload retries it.
// `page` is a whole route; without it, a part of one (its pictures); `quiet` shows nothing.
export default class LoadErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    const { page, quiet } = this.props;
    // A picture beside text that stands without it: nothing in its place
    if (quiet) return null;
    const body = (
      <>
        {page ? (
          <h1 className={styles.title}>Não foi possível abrir esta página</h1>
        ) : (
          <p className={styles.titleSmall}>Não foi possível carregar as imagens</p>
        )}
        <p className={styles.text}>
          A ligação pode ter falhado, ou o site foi atualizado entretanto. Recarregar resolve.
        </p>
        <button type="button" className={styles.button} onClick={() => window.location.reload()}>
          <FaRedo size={12} aria-hidden="true" /> Recarregar
        </button>
      </>
    );
    return page ? (
      <main className={styles.page}>
        <div className="container" role="alert">{body}</div>
      </main>
    ) : (
      <div className={styles.inline} role="alert">{body}</div>
    );
  }
}
