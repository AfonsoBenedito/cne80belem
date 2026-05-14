import { useState } from 'react';
import { useSEO } from '../../utils/useSEO';
import DatePicker, { registerLocale } from 'react-datepicker';
import { pt } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-theme.css';
import { FaBed, FaPaperPlane } from 'react-icons/fa';
import { mainEmail } from '../../config/contacts';
import styles from './ReservarAlojamento.module.css';

registerLocale('pt', pt);

const INITIAL = {
  organization: '',
  email: '',
  phone: '',
  dateFrom: null,
  timeFrom: null,
  dateTo: null,
  timeTo: null,
  message: '',
};

export default function ReservarAlojamento() {
  useSEO({
    title: 'Reservar Alojamento',
    description: 'Reserva o espaço de alojamento do Agrupamento 80 — Santa Maria de Belém para o teu grupo ou organização.',
  });

  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function fmtDate(d) {
    if (!d) return '';
    return d.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function fmtTime(d) {
    if (!d) return '';
    return d.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Reserva de Alojamento — ${form.organization}`,
    );

    const timeFromStr = form.timeFrom ? ` às ${fmtTime(form.timeFrom)}` : '';
    const timeToStr = form.timeTo ? ` às ${fmtTime(form.timeTo)}` : '';

    const body = encodeURIComponent(
      `Organização: ${form.organization}\n` +
      `Email: ${form.email}\n` +
      `Telefone: ${form.phone}\n` +
      `Data de entrada: ${fmtDate(form.dateFrom)}${timeFromStr}\n` +
      `Data de saída: ${fmtDate(form.dateTo)}${timeToStr}\n\n` +
      `Mensagem:\n${form.message}`,
    );

    window.location.href = `mailto:${mainEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.icon}>
            <FaBed size={28} />
          </div>
          <h1 className={styles.title}>Reservar Alojamento</h1>
          <p className={styles.subtitle}>
            Preenche o formulário abaixo para solicitar a reserva do nosso espaço.
          </p>
        </header>

        {sent ? (
          <div className={styles.success}>
            <FaPaperPlane size={32} />
            <h2>Pedido enviado!</h2>
            <p>O teu cliente de email deverá abrir com a mensagem pré-preenchida. Obrigado pelo contacto!</p>
            <button
              className={styles.resetBtn}
              onClick={() => { setForm(INITIAL); setSent(false); }}
            >
              Fazer novo pedido
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="organization">Organização</label>
              <input
                id="organization"
                name="organization"
                type="text"
                required
                placeholder="Agrupamento, Organização, Movimento, ..."
                className={styles.input}
                value={form.organization}
                onChange={handleChange}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="email@exemplo.pt"
                  className={styles.input}
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="phone">Telefone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="912 345 678"
                  className={styles.input}
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Data de entrada</label>
                <div className={styles.dateTimeRow}>
                  <DatePicker
                    selected={form.dateFrom}
                    onChange={(date) => setForm((prev) => ({ ...prev, dateFrom: date }))}
                    dateFormat="dd/MM/yyyy"
                    locale="pt"
                    placeholderText="dd/mm/aaaa"
                    className={`${styles.input} ${styles.dateInput}`}
                    wrapperClassName={styles.datePickerWrapper}
                    required
                    minDate={new Date()}
                  />
                  <DatePicker
                    selected={form.timeFrom}
                    onChange={(date) => setForm((prev) => ({ ...prev, timeFrom: date }))}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Hora"
                    dateFormat="HH:mm"
                    locale="pt"
                    placeholderText="HH:mm"
                    className={`${styles.input} ${styles.timeInput}`}
                    wrapperClassName={styles.timePickerWrapper}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Data de saída</label>
                <div className={styles.dateTimeRow}>
                  <DatePicker
                    selected={form.dateTo}
                    onChange={(date) => setForm((prev) => ({ ...prev, dateTo: date }))}
                    dateFormat="dd/MM/yyyy"
                    locale="pt"
                    placeholderText="dd/mm/aaaa"
                    className={`${styles.input} ${styles.dateInput}`}
                    wrapperClassName={styles.datePickerWrapper}
                    required
                    minDate={form.dateFrom || new Date()}
                  />
                  <DatePicker
                    selected={form.timeTo}
                    onChange={(date) => setForm((prev) => ({ ...prev, timeTo: date }))}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Hora"
                    dateFormat="HH:mm"
                    locale="pt"
                    placeholderText="HH:mm"
                    className={`${styles.input} ${styles.timeInput}`}
                    wrapperClassName={styles.timePickerWrapper}
                  />
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Informações adicionais sobre a vossa estadia..."
                className={`${styles.input} ${styles.textarea}`}
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              <FaPaperPlane size={14} />
              Enviar Pedido
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
