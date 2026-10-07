import { useState, useRef, useEffect } from 'react';
import { useSEO } from '../../utils/useSEO';
import DatePicker, { registerLocale } from 'react-datepicker';
import { pt } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-theme.css';
import { FaBed, FaEnvelope, FaCopy, FaCheck } from 'react-icons/fa';
import { mainEmail } from '../../config/contacts';
import styles from './ReservarAlojamento.module.css';

registerLocale('pt', pt);

// The calendar opens under its field and, on a phone, ran past the left edge of the screen.
// This keeps it inside the viewport (8px margin) by moving it sideways, never off-screen.
const keepOnScreen = {
  name: 'keepOnScreen',
  fn({ x, y, rects, elements }) {
    const pad = 8;
    const vw = document.documentElement.clientWidth;
    // x is relative to the calendar's offset parent; convert to screen space and back
    const toScreen = elements.reference.getBoundingClientRect().left - rects.reference.x;
    const left = Math.min(Math.max(x + toScreen, pad), vw - rects.floating.width - pad);
    return { x: left - toScreen, y };
  },
};
const pickerModifiers = [keepOnScreen];

// Touch screens use the phone's own date and time pickers (<input type="date"> / "time"): the
// wheel or calendar people already know, read out properly by VoiceOver and TalkBack, in the
// phone's language. A mouse keeps the calendar below, which is quicker to click through.
const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

// The form keeps Date objects either way (the email is written from them); native fields speak
// "2026-10-24" and "18:30", in local time
const pad2 = (n) => String(n).padStart(2, '0');
const toDateValue = (d) => (d ? `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}` : '');
const fromDateValue = (v) => {
  if (!v) return null;
  const [y, m, d] = v.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const toTimeValue = (d) => (d ? `${pad2(d.getHours())}:${pad2(d.getMinutes())}` : '');
const fromTimeValue = (v) => {
  if (!v) return null;
  const [h, min] = v.split(':').map(Number);
  const d = new Date();
  d.setHours(h, min, 0, 0);
  return d;
};
const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

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
    description: 'Reserva o espaço de alojamento do Agrupamento 80 - Santa Maria de Belém para o teu grupo ou organização.',
  });

  const [form, setForm] = useState(INITIAL);
  // The page can't send anything itself: it opens the visitor's mail app with the request
  // written out. `draft` keeps that request so it can be copied if no mail app opened.
  const [draft, setDraft] = useState(null);
  const [copied, setCopied] = useState(false);
  const [orgError, setOrgError] = useState('');
  const orgRef = useRef(null);
  const draftTextRef = useRef(null);
  // After "Preparar email" the form is replaced: focus goes to the confirmation so keyboard and
  // screen-reader users land on what happened, not at the top of the page
  const doneRef = useRef(null);
  useEffect(() => { if (draft) doneRef.current?.focus(); }, [draft]);

  // A new entry after the chosen exit clears the exit, rather than keeping an impossible stay
  function setDateFrom(date) {
    setForm((prev) => ({
      ...prev,
      dateFrom: date,
      dateTo: prev.dateTo && date && prev.dateTo < date ? null : prev.dateTo,
    }));
  }

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
    // "required" lets a name of only spaces through
    if (!form.organization.trim()) {
      setOrgError('Escreve o nome da organização.');
      orgRef.current?.focus();
      return;
    }

    const subject = `Reserva de Alojamento - ${form.organization}`;

    const timeFromStr = form.timeFrom ? ` às ${fmtTime(form.timeFrom)}` : '';
    const timeToStr = form.timeTo ? ` às ${fmtTime(form.timeTo)}` : '';

    const body =
      `Organização: ${form.organization}\n` +
      `Email: ${form.email}\n` +
      `Telefone: ${form.phone}\n` +
      `Data de entrada: ${fmtDate(form.dateFrom)}${timeFromStr}\n` +
      `Data de saída: ${fmtDate(form.dateTo)}${timeToStr}\n\n` +
      `Mensagem:\n${form.message}`;

    const href = `mailto:${mainEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraft({ subject, body, href });
    setCopied(false);
    window.location.href = href;
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.icon}>
            <FaBed size={28} aria-hidden="true" />
          </div>
          <h1 className={styles.title}>Reservar Alojamento</h1>
          <p className={styles.subtitle}>
            Preenche o formulário e preparamos o email do pedido de reserva do nosso espaço, pronto a enviar.
          </p>
        </header>

        {draft ? (
          // Says what actually happened: the email is written, not sent. The visitor still has
          // to press send, and gets the address and text in case no mail app opened.
          <div className={styles.success} role="status">
            <FaEnvelope size={32} aria-hidden="true" />
            <h2 ref={doneRef} tabIndex={-1} className={styles.doneTitle}>O teu email está pronto</h2>
            <p>
              Abrimos o teu programa de email com o pedido preenchido. Só falta carregar em enviar.
            </p>
            {/* Some mail apps cut a long mailto link short; the full text below is the safe copy */}
            {draft.href.length > 1800 && (
              <p className={styles.longNote}>
                A mensagem é longa: se o email abrir incompleto, copia o texto abaixo.
              </p>
            )}
            <div className={styles.fallback}>
              <p className={styles.fallbackLead}>
                Não abriu? Envia o pedido para <strong className={styles.fallbackEmail}>{mainEmail}</strong>:
              </p>
              <textarea
                className={styles.fallbackText}
                readOnly
                rows={8}
                ref={draftTextRef}
                value={`Assunto: ${draft.subject}\n\n${draft.body}`}
                aria-label="Texto do pedido"
                onFocus={(e) => e.target.select()}
              />
              <div className={styles.fallbackActions}>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(`${draft.subject}\n\n${draft.body}`);
                      setCopied('done');
                    } catch {
                      // Clipboard blocked (permissions, older browsers): select the text instead,
                      // so one Ctrl/Cmd+C (or the phone's Copy) finishes the job
                      draftTextRef.current?.focus();
                      draftTextRef.current?.select();
                      setCopied('selected');
                    }
                  }}
                >
                  {copied === 'done' ? <FaCheck size={12} aria-hidden="true" /> : <FaCopy size={12} aria-hidden="true" />}
                  {copied === 'done' ? 'Pedido copiado' : copied === 'selected' ? 'Texto selecionado: copia-o' : 'Copiar pedido'}
                </button>
                <a className={styles.resetBtn} href={draft.href}>Abrir o email outra vez</a>
              </div>
            </div>
            <button
              type="button"
              className={styles.newRequest}
              onClick={() => { setForm(INITIAL); setDraft(null); }}
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
                ref={orgRef}
                aria-invalid={orgError ? 'true' : undefined}
                aria-describedby={orgError ? 'organizationError' : undefined}
                name="organization"
                autoComplete="organization"
                type="text"
                required
                placeholder="Agrupamento, Organização, Movimento, ..."
                className={styles.input}
                value={form.organization}
                onChange={(e) => { handleChange(e); if (orgError) setOrgError(''); }}
              />
              {orgError && <p id="organizationError" className={styles.fieldError} role="alert">{orgError}</p>}
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
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
                  autoComplete="tel"
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
                {/* Required fields carry no mark; optional ones say so (the time is optional) */}
                <div className={styles.labelRow}>
                  <label className={styles.label} htmlFor="dateFrom">Data de entrada</label>
                  <span className={styles.optional} aria-hidden="true">hora opcional</span>
                </div>
                {/* The time field sits beside the date under one visible label; this names it */}
                <span id="timeFromLabel" className={styles.srOnly}>Hora de entrada (opcional)</span>
                <div className={styles.dateTimeRow}>
                  {isTouch ? (
                    <>
                      <input
                        type="date"
                        id="dateFrom"
                        required
                        min={toDateValue(startOfToday())}
                        value={toDateValue(form.dateFrom)}
                        onChange={(e) => setDateFrom(fromDateValue(e.target.value))}
                        className={`${styles.input} ${styles.nativeInput}`}
                      />
                      <input
                        type="time"
                        aria-labelledby="timeFromLabel"
                        value={toTimeValue(form.timeFrom)}
                        onChange={(e) => setForm((prev) => ({ ...prev, timeFrom: fromTimeValue(e.target.value) }))}
                        className={`${styles.input} ${styles.nativeInput}`}
                      />
                    </>
                  ) : (
                    <>
                      <DatePicker
                        selected={form.dateFrom}
                        id="dateFrom"
                        popperModifiers={pickerModifiers}
                        calendarClassName="alojamentoCalendar"
                        onChange={setDateFrom}
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
                        ariaLabelledBy="timeFromLabel"
                        popperModifiers={pickerModifiers}
                        calendarClassName="alojamentoCalendar"
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
                    </>
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <div className={styles.labelRow}>
                  <label className={styles.label} htmlFor="dateTo">Data de saída</label>
                  <span className={styles.optional} aria-hidden="true">hora opcional</span>
                </div>
                <span id="timeToLabel" className={styles.srOnly}>Hora de saída (opcional)</span>
                <div className={styles.dateTimeRow}>
                  {isTouch ? (
                    <>
                      <input
                        type="date"
                        id="dateTo"
                        required
                        min={toDateValue(form.dateFrom || startOfToday())}
                        value={toDateValue(form.dateTo)}
                        onChange={(e) => setForm((prev) => ({ ...prev, dateTo: fromDateValue(e.target.value) }))}
                        className={`${styles.input} ${styles.nativeInput}`}
                      />
                      <input
                        type="time"
                        aria-labelledby="timeToLabel"
                        value={toTimeValue(form.timeTo)}
                        onChange={(e) => setForm((prev) => ({ ...prev, timeTo: fromTimeValue(e.target.value) }))}
                        className={`${styles.input} ${styles.nativeInput}`}
                      />
                    </>
                  ) : (
                    <>
                      <DatePicker
                        selected={form.dateTo}
                        id="dateTo"
                        popperModifiers={pickerModifiers}
                        calendarClassName="alojamentoCalendar"
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
                        ariaLabelledBy="timeToLabel"
                        popperModifiers={pickerModifiers}
                        calendarClassName="alojamentoCalendar"
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
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">Mensagem <span className={styles.optional}>(opcional)</span></label>
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
              <FaEnvelope size={14} aria-hidden="true" />
              Preparar email
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
