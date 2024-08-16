class AddUrlToRestaurants < ActiveRecord::Migration[7.2]
  def change
    add_column :restaurants, :url, :string, after: :time_required
  end
end
