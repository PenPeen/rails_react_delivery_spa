export interface LineFood {
  id: number;
  restaurant_id: number;
  order_id: number;
  food_id: number;
  count: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}
