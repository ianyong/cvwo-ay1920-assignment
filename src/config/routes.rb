Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "home#index"

  namespace :api do
    post 'auth/register', to: 'users#register'
    post 'auth/login', to: 'users#login'
    post 'users/filters', to: 'users#set_filters'
    get 'users/filters', to: 'users#get_filters'
    jsonapi_resources :tasks
    jsonapi_resources :tags
  end
  get "*path", to: "home#index", constraints: { format: "html" }
end
