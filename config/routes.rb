Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :restaurants do
        resources :foods, only: %i[index]
      end

      resources :line_foods, only: %i[index create destroy]
      put "line_foods/replace", to: "line_foods#replace"
      get "line_foods/cart_count", to: "line_foods#cart_count"
      resources :orders, only: %i[create]

      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/sessions"
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
