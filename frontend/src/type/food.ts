export interface Food {
  id: number;
  restaurant_id: number;
  name: string;
  url: string;
  price: number;
  description: string;
  updated_at?: string;
}
