export interface TodoItem {
  id: number;
  title: string;
  content: string;
}

export const store: TodoItem[] = [
  {
    id: 1,
    title: 'hi',
    content: 'test',
  },
];
