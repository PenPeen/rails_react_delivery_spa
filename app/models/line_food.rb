# == Schema Information
#
# Table name: line_foods
#
#  id            :integer          not null, primary key
#  active        :boolean          default(FALSE), not null
#  count         :integer          default(0), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  food_id       :integer          not null
#  order_id      :integer
#  restaurant_id :integer          not null
#
# Indexes
#
#  index_line_foods_on_food_id        (food_id)
#  index_line_foods_on_order_id       (order_id)
#  index_line_foods_on_restaurant_id  (restaurant_id)
#
# Foreign Keys
#
#  food_id        (food_id => foods.id)
#  order_id       (order_id => orders.id)
#  restaurant_id  (restaurant_id => restaurants.id)
#
class LineFood < ApplicationRecord
  belongs_to :food
  belongs_to :restaurant
  belongs_to :order, optional: true

  validates :count, numericality: { greater_than: 0 }

  scope :active, -> { where(active: true) }
  scope :other_restaurant, ->(picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id) }

  def total_amount
    food.price * count
  end
end
