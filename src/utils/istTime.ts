// Therapist availability is entered and stored as India wall-clock time, so every
// slot the UI shows is IST — regardless of where the person booking is.
export const IST_TIMEZONE = 'Asia/Kolkata';

// India has not observed DST since 1945, so a fixed offset is exact.
const IST_OFFSET_MINUTES = 5 * 60 + 30;

const pad = (n: number) => String(n).padStart(2, '0');

function parseSlot(slot: string): [number, number] {
  const [hh, mm = 0] = slot.split(':').map(Number);
  if (!Number.isInteger(hh) || !Number.isInteger(mm) || hh < 0 || hh > 23 || mm < 0 || mm > 59) {
    throw new Error(`Invalid slot "${slot}", expected "HH:mm"`);
  }
  return [hh, mm];
}

/** The calendar day the user clicked + an IST "HH:mm" slot → UTC ISO instant. */
export function istSlotToUtcIso(calendarDay: Date, slot: string): string {
  const [hh, mm] = parseSlot(slot);
  const wallClockAsUtc = Date.UTC(calendarDay.getFullYear(), calendarDay.getMonth(), calendarDay.getDate(), hh, mm);
  return new Date(wallClockAsUtc - IST_OFFSET_MINUTES * 60 * 1000).toISOString();
}

/** Same slot as an IST wall-clock string without offset ("YYYY-MM-DDTHH:mm:00"). */
export function istSlotToIstWallClock(calendarDay: Date, slot: string): string {
  const [hh, mm] = parseSlot(slot);
  return `${calendarDay.getFullYear()}-${pad(calendarDay.getMonth() + 1)}-${pad(calendarDay.getDate())}T${pad(hh)}:${pad(mm)}:00`;
}

/** "YYYY-MM-DD-HH" in IST, for matching a slot against a stored appointment instant. */
export function istDateHourKey(instant: Date): string {
  if (isNaN(instant.getTime())) return '';
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: IST_TIMEZONE,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', hour12: false,
  }).formatToParts(instant);
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}-${get('hour')}`;
}
