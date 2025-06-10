import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  getDaysInMonth(year: number, month: number): Date[] {
    const firstDayOfMonth = new Date(year, month, 1);

    const firstDayOffset =
      firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

    firstDayOfMonth.setDate(firstDayOfMonth.getDate() - firstDayOffset);

    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    const days: Date[] = [];
    for (let i = 0; i < totalDaysInMonth + firstDayOffset; i++) {
      const day = new Date(firstDayOfMonth);
      day.setDate(firstDayOfMonth.getDate() + i);
      days.push(day);
    }
    return days;
  }

  nextMonth(
    year: number,
    month: number
  ): { newYear: number; newMonth: number } {
    if (month === 11) {
      return { newYear: year + 1, newMonth: 0 };
    } else {
      return { newYear: year, newMonth: month + 1 };
    }
  }

  previousMonth(
    year: number,
    month: number
  ): {
    newYear: number;
    newMonth: number;
  } {
    if (month === 0) {
      return { newYear: year - 1, newMonth: 11 };
    } else {
      return { newYear: year, newMonth: month - 1 };
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  isPast(date: Date): boolean {
    const today = new Date();
    const todayMidnight = new Date(today.setHours(0, 0, 0, 0));
    return date < todayMidnight;
  }
}
