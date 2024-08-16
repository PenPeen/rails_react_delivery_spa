# == Schema Information
#
# Table name: foods
#
#  id            :bigint           not null, primary key
#  description   :text(65535)      not null
#  name          :string(255)      not null
#  price         :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  restaurant_id :bigint           not null
#
# Indexes
#
#  index_foods_on_restaurant_id  (restaurant_id)
#
# Foreign Keys
#
#  fk_rails_...  (restaurant_id => restaurants.id)
#
class Food < ApplicationRecord
  belongs_to :restaurant
  belongs_to :order, optional: true
  has_one :line_food
end
