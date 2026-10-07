import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { pt } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-theme.css';
import styles from './ReservarAlojamento.module.css';

// The mouse version of one "date + optional time" pair. Its own module so the calendar library
// is a separate download that touch screens never ask for.

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

// The library's screen-reader labels are English ("Choose Date", "Choose quarta-feira…") even with
// the pt locale; these say it in Portuguese
function CalendarContainer({ className, children, showTimeSelectOnly, inline }) {
  return (
    <div
      className={className}
      aria-label={showTimeSelectOnly ? 'Escolher hora' : 'Escolher data'}
      role={inline ? undefined : 'dialog'}
      aria-modal={inline ? undefined : 'true'}
      translate="no"
    >
      {children}
    </div>
  );
}
const pickerLabels = {
  calendarContainer: CalendarContainer,
  chooseDayAriaLabelPrefix: 'Escolher',
  disabledDayAriaLabelPrefix: 'Indisponível:',
  monthAriaLabelPrefix: 'Mês',
  previousMonthAriaLabel: 'Mês anterior',
  nextMonthAriaLabel: 'Mês seguinte',
  previousMonthButtonLabel: 'Mês anterior',
  nextMonthButtonLabel: 'Mês seguinte',
};

// The time list's arrow keys step from this: from the bare clock they went 16:24, 16:54…
const halfHourFloor = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() < 30 ? 0 : 30, 0, 0);
  return d;
};
export default function DesktopDateTime({
  id, pickerRef, date, onDate, minDate, time, onTime, timeLabelId,
  'aria-invalid': ariaInvalid, 'aria-describedby': ariaDescribedBy,
}) {
  const [timeStart] = useState(halfHourFloor);
  return (
    <>
      <DatePicker
        selected={date}
        ref={pickerRef}
        id={id}
        ariaInvalid={ariaInvalid}
        ariaDescribedBy={ariaDescribedBy}
        {...pickerLabels}
        popperModifiers={pickerModifiers}
        calendarClassName="alojamentoCalendar"
        onChange={onDate}
        dateFormat="dd/MM/yyyy"
        locale="pt"
        placeholderText="dd/mm/aaaa"
        className={`${styles.input} ${styles.dateInput}`}
        wrapperClassName={styles.datePickerWrapper}
        required
        minDate={minDate}
      />
      <DatePicker
        selected={time}
        ariaLabelledBy={timeLabelId}
        {...pickerLabels}
        popperModifiers={pickerModifiers}
        calendarClassName="alojamentoCalendar"
        onChange={onTime}
        showTimeSelect
        showTimeSelectOnly
        openToDate={timeStart}
        timeIntervals={30}
        timeCaption="Hora"
        dateFormat="HH:mm"
        locale="pt"
        placeholderText="HH:mm"
        className={`${styles.input} ${styles.timeInput}`}
        wrapperClassName={styles.timePickerWrapper}
      />
    </>
  );
}
