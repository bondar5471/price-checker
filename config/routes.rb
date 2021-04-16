Rails.application.routes.draw do
  root 'home#index'
  namespace :api, constraints: { format: :json } do
    namespace :v1 do
      resources :users, only: [:create]
      post 'auth/sign_in', to: 'auth#sign_in'
      post 'auth/sign_out', to: 'auth#sign_out'

      post 'sign_up', to: 'sign_up#create'
    end
  end
  get '*any', to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
