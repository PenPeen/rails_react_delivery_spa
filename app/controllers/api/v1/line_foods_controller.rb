module Api
  module V1
    class LineFoodsController < ApplicationController
      before_action :set_line_food, only: %i[create]
      before_action :validate_ordered, only: %i[create]

      def index
        line_foods = LineFood.all

        render json: {
          line_foods:
        }, status: :ok
      end

      def create
        set_line_food(@ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          head :unprocessable_entity
        end
      end

      private
        def set_food
          @ordered_food = Food.find(params[:food_id])
        end

        def validate_ordered
          if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
            render json: {
              existing_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
              new_restaurant: Food.find(params[:food_id]).restaurant.name
            }, status: :not_acceptable
          end
        end

        def set_line_food(ordered_food)
          if ordered_food.line_food.present?
            @line_food = ordered_food.line_food
            @line_food.attributes = {
              count: ordered_food.line_food.count + params[:count],
              active: true
            }
          else
            @line_food = ordered_food.build_line_food(
              count: params[:count],
              restaurant: ordered_food.restaurant,
              active: true
            )
          end
        end
    end
  end
end
