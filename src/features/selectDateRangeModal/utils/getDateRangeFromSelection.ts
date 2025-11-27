import { SelectedMonth } from 'src/shared/ui/monthRangeInput/monthRangeInput';
import { DateRange } from 'src/features/selectDateRangeModal/model/dateRange';

export function getDateRangeFromSelection(selectedMonths: SelectedMonth[]): DateRange | null {
    if (selectedMonths.length === 0) {
        return null;
    }

    // Создаем массив всех дат (год + месяц)
    const allDates: Array<{ year: number; month: number }> = [];

    selectedMonths.forEach(yearData => {
        yearData.monthIndexes.forEach(monthIndex => {
            allDates.push({
                year: yearData.year,
                month: monthIndex,
            });
        });
    });

    if (allDates.length === 0) {
        return null;
    }

    // Сортируем по году и месяцу
    allDates.sort((a, b) => {
        if (a.year !== b.year) {
            return a.year - b.year;
        }
        return a.month - b.month;
    });

    // Первая дата - начало первого месяца
    const firstDate = allDates[0];
    const startDate = new Date(firstDate.year, firstDate.month, 1);

    // Последняя дата - конец последнего месяца
    const lastDate = allDates[allDates.length - 1];
    const endDate = new Date(lastDate.year, lastDate.month + 1, 0);

    return { startDate, endDate };
}
