import { useState, useRef, useEffect, useSyncExternalStore, lazy, Suspense } from 'react';
import { useSEO } from '../../utils/useSEO';
import { FaBed, FaEnvelope, FaCopy, FaCheck } from 'react-icons/fa';
import { mainEmail } from '../../config/contacts';
import styles from './ReservarAlojamento.module.css';

// The calendar (react-datepicker, ~48 KB gzipped, and its CSS) is loaded only for a mouse:
// touch screens use the phone's own fields and never download it
const DesktopDateTime = lazy(() => import('./DesktopDateTime'));

// Two empty field boxes while the calendar loads, so the form doesn't jump when it arrives
const pickerFallback = (
  <>
    <span className={`${styles.input} ${styles.inputLoading}`} aria-hidden="true">dd/mm/aaaa</span>
    <span className={`${styles.input} ${styles.inputLoading}`} aria-hidden="true">HH:mm</span>
  </>
);

// Touch screens use the phone's own date and time pickers (<input type="date"> / "time"): the
// wheel or calendar people already know, read out properly by VoiceOver and TalkBack, in the
// phone's language. A mouse keeps the calendar below, which is quicker to click through.
// Read live, not once at load: a laptop with a touch screen can switch between the two.
const coarse = typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)') : null;
const onPointerChange = (cb) => {
  coarse?.addEventListener('change', cb);
  return () => coarse?.removeEventListener('change', cb);
};
const readTouch = () => Boolean(coarse?.matches);

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
  contactName: '',
  people: '',
  email: '',
  phone: '',
  dateFrom: null,
  timeFrom: null,
  dateTo: null,
  timeTo: null,
  message: '',
};

// Checked in this order, so the first error is the first field on the page. The browser's own
// bubbles were in the browser's language and vanished on their own; these stay under the field.
const FIELD_ORDER = ['organization', 'contactName', 'people', 'email', 'phone', 'dateFrom', 'dateTo'];

function validate(form) {
  const errors = {};
  // "required" let a name of only spaces through
  if (!form.organization.trim()) errors.organization = 'Escreve o nome da organização.';
  if (!form.contactName.trim()) errors.contactName = 'Escreve o nome de quem fica responsável.';
  if (!/^\d+$/.test(form.people.trim()) || Number(form.people) < 1) {
    errors.people = 'Escreve quantas pessoas vêm, só o número (por exemplo, 25).';
  }
  if (!form.email.trim()) errors.email = 'Escreve o teu email, para te respondermos.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Este email parece incompleto. Confirma-o (por exemplo, nome@exemplo.pt).';
  }
  if (!form.phone.trim()) errors.phone = 'Escreve um número de telefone.';
  // The calendar empties a typed date it can't take (one already past), so say what it takes
  if (!form.dateFrom) errors.dateFrom = 'Escolhe a data de entrada, de hoje em diante.';
  else if (form.dateFrom < startOfToday()) errors.dateFrom = 'A data de entrada já passou. Escolhe hoje ou mais tarde.';
  if (!form.dateTo) errors.dateTo = 'Escolhe a data de saída.';
  else if (form.dateFrom && form.dateTo < form.dateFrom) errors.dateTo = 'A data de saída não pode ser antes da entrada.';
  return errors;
}

export default function ReservarAlojamento() {
  useSEO({
    title: 'Reservar Alojamento',
    description: 'Reserva o espaço de alojamento do Agrupamento 80 - Santa Maria de Belém para o teu grupo ou organização.',
  });

  const isTouch = useSyncExternalStore(onPointerChange, readTouch, () => false);
  const [form, setForm] = useState(INITIAL);
  // The page can't send anything itself: it opens the visitor's mail app with the request
  // written out. `draft` keeps that request so it can be copied if no mail app opened.
  const [draft, setDraft] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});
  // Set when a new entry date clears the exit, so the visitor is told rather than finding it empty
  const [exitCleared, setExitCleared] = useState(false);
  const draftTextRef = useRef(null);
  // After "Preparar email" the form is replaced: focus goes to the confirmation so keyboard and
  // screen-reader users land on what happened, not at the top of the page
  const doneRef = useRef(null);
  // …and "Fazer novo pedido" brings them back to the form's first field, not the top of the page
  const firstFieldRef = useRef(null);
  const restarted = useRef(false);
  useEffect(() => {
    if (draft) doneRef.current?.focus();
    else if (restarted.current) firstFieldRef.current?.focus();
  }, [draft]);
  // The desktop calendars, so an error can close the one its focus would open
  const dateFromPicker = useRef(null);
  const dateToPicker = useRef(null);

  // A new entry after the chosen exit clears the exit, rather than keeping an impossible stay
  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }

  function setDateFrom(date) {
    const clears = Boolean(form.dateTo && date && form.dateTo < date);
    setField('dateFrom', date);
    if (clears) setForm((prev) => ({ ...prev, dateTo: null }));
    setExitCleared(clears);
  }

  function setDateTo(date) {
    setField('dateTo', date);
    setExitCleared(false);
  }

  function handleChange(e) {
    setField(e.target.name, e.target.value);
  }

  // The props that tie a field to its message below it
  function errorProps(name) {
    if (errors[name]) return { 'aria-invalid': 'true', 'aria-describedby': `${name}Error` };
    if (name === 'dateTo' && exitCleared) return { 'aria-describedby': 'dateToCleared' };
    return {};
  }

  function fieldError(name) {
    return errors[name] && <p id={`${name}Error`} className={styles.fieldError}>{errors[name]}</p>;
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
    const found = validate(form);
    const first = FIELD_ORDER.find((name) => found[name]);
    setErrors(found);
    if (first) {
      // Focus reads the field's name and then its message (aria-describedby). On a date, focus
      // opens the calendar, which would cover the message: close it (keeping focus; true skips the
      // library's blur), and a key opens it again
      document.getElementById(first)?.focus();
      ({ dateFrom: dateFromPicker, dateTo: dateToPicker })[first]?.current?.setOpen(false, true);
      return;
    }

    const organization = form.organization.trim();
    const contactName = form.contactName.trim();
    const subject = `Reserva de Alojamento - ${organization}`;

    const timeFromStr = form.timeFrom ? ` às ${fmtTime(form.timeFrom)}` : '';
    const timeToStr = form.timeTo ? ` às ${fmtTime(form.timeTo)}` : '';
    const message = form.message.trim();

    // A request someone reads, not a list of fields: a greeting, the stay, then who to answer
    const body =
      `Olá,\n\n` +
      `Gostaríamos de reservar o vosso espaço de alojamento.\n\n` +
      `Organização: ${organization}\n` +
      `Número de pessoas: ${Number(form.people)}\n` +
      `Entrada: ${fmtDate(form.dateFrom)}${timeFromStr}\n` +
      `Saída: ${fmtDate(form.dateTo)}${timeToStr}\n\n` +
      (message ? `${message}\n\n` : '') +
      `Responsável: ${contactName}\n` +
      `Email: ${form.email.trim()}\n` +
      `Telefone: ${form.phone.trim()}\n\n` +
      `Com os melhores cumprimentos,\n${contactName}`;

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
          // No role="status": focus moves to the heading, which announces it; a live region round
          // the whole panel could read all of it out as well
          <div className={styles.success}>
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
              onClick={() => {
                restarted.current = true;
                setForm(INITIAL);
                setErrors({});
                setExitCleared(false);
                setDraft(null);
              }}
            >
              Fazer novo pedido
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="organization">Organização</label>
              <input
                id="organization"
                ref={firstFieldRef}
                {...errorProps('organization')}
                name="organization"
                autoComplete="organization"
                type="text"
                required
                placeholder="Agrupamento, Organização, Movimento, ..."
                className={styles.input}
                value={form.organization}
                onChange={handleChange}
              />
              {fieldError('organization')}
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contactName">Nome do responsável</label>
                <input
                  id="contactName"
                  {...errorProps('contactName')}
                  name="contactName"
                  autoComplete="name"
                  type="text"
                  required
                  placeholder="Nome e apelido"
                  className={styles.input}
                  value={form.contactName}
                  onChange={handleChange}
                />
                {fieldError('contactName')}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="people">Número de pessoas</label>
                <input
                  id="people"
                  {...errorProps('people')}
                  name="people"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  required
                  placeholder="Por exemplo, 25"
                  className={styles.input}
                  value={form.people}
                  onChange={handleChange}
                />
                {fieldError('people')}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                  id="email"
                  {...errorProps('email')}
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  placeholder="email@exemplo.pt"
                  className={styles.input}
                  value={form.email}
                  onChange={handleChange}
                />
                {fieldError('email')}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="phone">Telefone</label>
                <input
                  id="phone"
                  {...errorProps('phone')}
                  name="phone"
                  autoComplete="tel"
                  type="tel"
                  required
                  placeholder="912 345 678"
                  className={styles.input}
                  value={form.phone}
                  onChange={handleChange}
                />
                {fieldError('phone')}
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
                        {...errorProps('dateFrom')}
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
                    <Suspense fallback={pickerFallback}>
                      <DesktopDateTime
                        id="dateFrom"
                        pickerRef={dateFromPicker}
                        date={form.dateFrom}
                        onDate={setDateFrom}
                        minDate={startOfToday()}
                        time={form.timeFrom}
                        onTime={(date) => setForm((prev) => ({ ...prev, timeFrom: date }))}
                        timeLabelId="timeFromLabel"
                        {...errorProps('dateFrom')}
                      />
                    </Suspense>
                  )}
                </div>
                {fieldError('dateFrom')}
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
                        {...errorProps('dateTo')}
                        required
                        min={toDateValue(form.dateFrom || startOfToday())}
                        value={toDateValue(form.dateTo)}
                        onChange={(e) => setDateTo(fromDateValue(e.target.value))}
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
                    <Suspense fallback={pickerFallback}>
                      <DesktopDateTime
                        id="dateTo"
                        pickerRef={dateToPicker}
                        date={form.dateTo}
                        onDate={setDateTo}
                        minDate={form.dateFrom || startOfToday()}
                        time={form.timeTo}
                        onTime={(date) => setForm((prev) => ({ ...prev, timeTo: date }))}
                        timeLabelId="timeToLabel"
                        {...errorProps('dateTo')}
                      />
                    </Suspense>
                  )}
                </div>
                {fieldError('dateTo')}
                {/* Always in the page, so the screen reader hears the message when it appears */}
                <p id="dateToCleared" className={styles.fieldNote} aria-live="polite">
                  {exitCleared && !errors.dateTo && 'Limpámos a data de saída: ficava antes da nova entrada.'}
                </p>
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
