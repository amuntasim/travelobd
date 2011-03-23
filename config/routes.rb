Travelobd::Application.routes.draw do

  resources :tour_clubs do
    resources :comments
    collection do
      get :search
    end

    member do
      get :print
      post :rate
      post :join_leave
    end
  end

  match '/auth/:provider/callback' => 'authentications#create'
  match '/auth/failure' => 'users#failure'

  resources :authentications

  resources :tour_operators do
    resources :comments
    collection do
      post :delete_asset
      post :set_main_photo
      get :search
    end

    member do
      get :print
      post :rate
    end
  end

  resources :transports do
    resources :comments
    collection do
      post :delete_asset
      post :set_main_photo
      get :search
    end

    member do
      get :print
      post :rate
    end
  end

  resources :rooms

  resources :password_reset

  resources :profiles

  resources :hotels do
    resources :comments
    collection do
      post :delete_asset
      post :set_main_photo
      get :search
      get :load_spots
    end
    member do
      get :print
      post :rate
    end
  end

#

  resources :packages do
    resources :comments

    collection do
      post :delete_asset
      post :set_main_photo
      get :search
      get :location_autocomplete
    end
    member do
      get :print
      post :rate
    end
  end

  resources :messages

  resources :spots do
    resources :comments
    collection do
      post :delete_asset
      post :set_main_photo
      get :search
    end
    member do
      get :print
      post :rate
    end
  end

  resources :elements

  resources :articles do
    resources :comments
    collection do
      post :delete_asset
      post :set_main_photo
      get :search
    end
    member do
      get :print
      post :rate
    end
  end

  resource :user_session
  resources :users do
    collection do
      post :save_item
      post :remove_saved_item
      get :load_uploaded_images
      post :upload_images
    end
    resource :profile
  end

  get "welcome/index"
  get "welcome/load_districts"
  get "users/dashboard"


  match 'login' => 'user_sessions#new'
  match 'logout' => 'user_sessions#destroy'
  match 'place_an_ad' => 'ads#new'

  #match 'checkout' => 'carts#show'
  root :to => "welcome#index"

  #ajax on home page
  get 'welcome/articles'
  get 'welcome/other_classifieds'
  get 'welcome/featured_ads'
  get 'welcome/spots'


  match 'advance_search' =>'ads#advance_search'


  #dashboard
  match 'dashboard' => 'users#dashboard'
  match 'inbox' => 'users#inbox'
  match 'outbox' => 'users#outbox'
  match 'my_saved_listings' => 'users#saved_listings'
  match 'my_spots' => 'users#spots'
  match 'my_packages' => 'users#packages'
  match 'my_hotels' => 'users#hotels'
  match 'my_rooms' => 'users#rooms'
  match 'my_transports' => 'users#transports'
  match 'my_clubs' => 'users#clubs'
  match 'my_articles' => 'users#articles'
  match 'send_to_friends' => 'users#send_to_friends'


  #newly added
  match 'tell_friends' => 'users#tell_friends'

  post 'assets/update_label', :as => :update_asset_label

end
