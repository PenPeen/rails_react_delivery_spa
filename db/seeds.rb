ActiveRecord::Base.transaction do
  5.times do |n|
    restaurant_names = [ "桜井食堂", "太郎寿司", "田中うどん", "麺屋トトロ", "地元に愛された源ちゃん食堂" ]
    restaurant = Restaurant.new(
      name: restaurant_names[n],
      fee: [ 100, 200, 300, 400, 500 ].sample,
      time_required: [ 10, 20, 30, 40, 50 ].sample
    )

    12.times do |m|
      food_names = [ "カレーライス", "寿司盛り合わせ", "特製うどん", "天ぷら定食", "焼き鳥セット",
                    "ラーメン", "餃子セット", "オムライス", "ビーフステーキ", "サラダ", "スープ", "デザート" ]
      food_descriptions = [
        "当店自慢のカレーライス。スパイスが効いており、辛さも選べます。",
        "新鮮な魚介をふんだんに使用した寿司盛り合わせ。味も見た目も満足の一品です。",
        "特製だしで炊いたうどんは、コシが強く、喉越しも抜群です。",
        "サクサクの天ぷらとごはん、味噌汁がセットになったお得な定食です。",
        "5種類の串焼きが楽しめる焼き鳥セット。一本一本丁寧に焼き上げています。",
        "濃厚でクリーミーな豚骨スープのラーメン。こってり好きにはたまらない一杯。",
        "にんにくたっぷり、外はカリカリ、中はジューシーな餃子。ビールに最適です。",
        "ふわふわの卵と鶏肉がケチャップライスによく合う、子どもから大人まで人気のオムライス。",
        "高品質な牛肉を使用したビーフステーキ。柔らかく、ジューシーな味わいが自慢。",
        "新鮮な季節の野菜を使用したサラダ。ドレッシングは手作りです。",
        "体が温まるミネストローネスープ。具材たっぷりで食べ応えもあります。",
        "季節のフルーツを使ったデザート。見た目も美しく、甘さ控えめです。"
      ]

      restaurant.foods.build(
        name: food_names[m % food_names.size],
        price: [ 300, 400, 500, 600, 700 ].sample,
        description: food_descriptions[m % food_descriptions.size]
      )
    end

    restaurant.save!
  end
end

puts 'The initial data has been successfully created.'
