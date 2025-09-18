export interface Book {
  id: number;
  title: string;
  authors?: string;
  category?: string;
  published_date?: string;
  cover_url?: string;
  synopsis?: string;
  pages?: number;
  publisher?: string;
  price?: string;
}

export interface OrderItemPayload {
  book_id: number;
  quantity: number;
  price: number;
}
