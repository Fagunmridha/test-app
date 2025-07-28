export interface Book {
  id: number;
  title: string;
  authors: { name: string }[];
  subjects?: string[];
}
