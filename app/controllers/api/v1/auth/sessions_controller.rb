class Api::V1::Auth::SessionsController < ApplicationController
  def index
    if current_api_v1_user
      render json: { is_login: true, user: current_api_v1_user }
    else
      render json: { is_login: false, message: "User Not Found" }
    end
  end
end
