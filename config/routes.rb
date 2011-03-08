Travelobd::Application.routes.draw do

  resources :transports

  resources :rooms

  resources :password_reset

  resources :profiles

  resources :hotels do
    collection do
      post :delete_asset
      post :set_main_photo
      get :search
    end
    member do
      get :print
    end
  end

  resources :classifieds do
    collection do
      post :delete_asset
      post :set_main_photo
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
    collection do
      post :delete_asset
      post :set_main_photo
      get :search
    end
  end

  resources :elements

  resources :articles do
    collection do
      post :delete_asset
      post :set_main_photo
      get :search
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


  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
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
  match 'send_to_friends' => 'users#send_to_friends'


  #newly added
  match 'tell_friends' => 'users#tell_friends'


end
