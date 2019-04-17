Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    namespace :api do
    resources :users
    resources :restaurants
    resources :orders
    get 'users/:id/orders', to: 'users#userhistory'
    get 'restaurant_history', to: 'orders#restaurant_history'
    get 'restaurant_visit_counter', to: 'orders#restaurant_visit_counter'
  end
end
