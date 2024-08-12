ActiveRecord::Base.transaction do
  3.times do |n|
    restaurant = Restaurant.new(
      name: "レストラン_#{n}",
      fee: [ 100, 200, 300, 400, 500 ].sample,
      time_required: [ 10, 20, 30, 40, 50 ].sample
    )

    12.times do |m|
      restaurant.foods.build(
        name: "フード_#{m}",
        price: [ 300, 400, 500, 600, 700 ].sample,
        description: "フード_#{m}: ~~~"
      )
    end

    restaurant.save!
  end
end

puts ('The initial data has been successfully.')
