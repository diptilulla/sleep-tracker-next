export interface Journal {
  date: string | number | Date;
  id: string;
  mood: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
}