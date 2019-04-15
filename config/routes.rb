Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    namespace :api do
    resources :users, only: :update
    resources :restaurants
    resources :orders
    get 'users/:id/orders', to: 'users#userhistory'
    get 'restaurant_history', to: 'orders#restaurant_history'
  end
end
