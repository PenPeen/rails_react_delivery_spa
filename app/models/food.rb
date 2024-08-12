# == Schema Information
#
# Table name: foods
#
#  id            :integer          not null, primary key
#  description   :text             not null
#  name          :string           not null
#  price         :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  restaurant_id :integer          not null
#
# Indexes
#
#  index_foods_on_restaurant_id  (restaurant_id)
#
# Foreign Keys
#
#  restaurant_id  (restaurant_id => restaurants.id)
#
class Food < ApplicationRecord
  belongs_to :restaurant
  belongs_to :order, optional: true
  has_one :line_food
end
