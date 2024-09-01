class Api::V1::SessionsController < ApplicationController
  private
    def index
      if current_api_v1_user
        render json: { is_login: true, data: current_api_v1_user }
      else
        render json: { is_login: false, message: "ユーザーが存在しません" }
      end
    end

    def sign_up_params
      params.permit(:email, :password, :password_confirmation, :name)
    end
end
