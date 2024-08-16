class AddUrlToFoods < ActiveRecord::Migration[7.2]
  def change
    add_column :foods, :url, :string, after: :price
  end
end
