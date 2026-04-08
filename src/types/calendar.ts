export interface Note {
  id: string;
  date: string; // ISO string or specific date format
  content: string;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface MonthData {
  month: number;
  year: number;
  image: string;
  accentColor: string;
}
