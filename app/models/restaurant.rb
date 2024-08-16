# == Schema Information
#
# Table name: restaurants
#
#  id            :bigint           not null, primary key
#  fee           :integer          default(0), not null
#  name          :string(255)      not null
#  time_required :integer          not null
#  url           :string(255)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Restaurant < ApplicationRecord
  has_many :foods
  has_many :line_foods, through: :foods

  validates :name, :fee, :time_required, presence: true
  validates :name, length: { maximum: 30 }
  validates :fee, numericality: { greater_than: 0 }
end
