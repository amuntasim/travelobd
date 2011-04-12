# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110412084646) do

  create_table "admin_users", :force => true do |t|
    t.string   "first_name",       :default => "",    :null => false
    t.string   "last_name",        :default => "",    :null => false
    t.string   "role",                                :null => false
    t.string   "email",                               :null => false
    t.boolean  "status",           :default => false
    t.string   "token",                               :null => false
    t.string   "salt",                                :null => false
    t.string   "crypted_password",                    :null => false
    t.string   "preferences"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "article_translations", :force => true do |t|
    t.integer  "article_id"
    t.string   "locale"
    t.string   "title"
    t.text     "detail"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "articles", :force => true do |t|
    t.integer  "user_id"
    t.boolean  "active",      :default => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "category_id"
  end

  add_index "articles", ["user_id", "active"], :name => "index_articles_on_user_id_and_active"

  create_table "assets", :force => true do |t|
    t.integer  "assetable_id"
    t.string   "assetable_type"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "main",               :default => false
    t.string   "label_en"
    t.string   "label_bn"
  end

  create_table "authentications", :force => true do |t|
    t.integer  "user_id"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "branch_location_translations", :force => true do |t|
    t.integer "branch_location_id"
    t.string  "locale"
    t.string  "location"
    t.string  "address"
    t.string  "phone"
  end

  create_table "branch_locations", :force => true do |t|
    t.integer  "branchable_id"
    t.string   "branchable_type"
    t.integer  "district_id"
    t.string   "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", :force => true do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "email"
    t.text     "content"
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.boolean  "approved",         :default => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "condition_translations", :force => true do |t|
    t.integer "condition_id"
    t.string  "locale"
    t.text    "detail"
  end

  create_table "conditions", :force => true do |t|
    t.integer  "conditionable_id"
    t.string   "conditionable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "contact_translations", :force => true do |t|
    t.integer  "contact_id"
    t.string   "locale"
    t.string   "name"
    t.text     "address"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "contacts", :force => true do |t|
    t.integer  "contactable_id"
    t.string   "email"
    t.string   "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "contactable_type"
  end

  create_table "countries", :force => true do |t|
    t.string   "code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "country_translations", :force => true do |t|
    t.integer  "country_id"
    t.string   "locale"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "country_translations", ["country_id"], :name => "index_country_translations_on_country_id"

  create_table "departure_schedule_translations", :force => true do |t|
    t.integer "departure_schedule_id"
    t.string  "locale"
    t.string  "route"
    t.text    "time"
  end

  create_table "departure_schedules", :force => true do |t|
    t.integer  "transport_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "disciplines", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "district_translations", :force => true do |t|
    t.integer  "district_id"
    t.string   "locale"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "district_translations", ["district_id"], :name => "index_district_translations_on_district_id"

  create_table "districts", :force => true do |t|
    t.integer  "country_id"
    t.integer  "division_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "active",      :default => true
  end

  add_index "districts", ["division_id"], :name => "index_districts_on_division_id"

  create_table "districts_tour_operators", :id => false, :force => true do |t|
    t.integer "district_id"
    t.integer "tour_operator_id"
  end

  create_table "division_translations", :force => true do |t|
    t.integer  "division_id"
    t.string   "locale"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "division_translations", ["division_id"], :name => "index_division_translations_on_division_id"

  create_table "divisions", :force => true do |t|
    t.integer  "country_id"
    t.string   "code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "elements", :force => true do |t|
    t.string   "name"
    t.string   "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "elements", ["name"], :name => "index_elements_on_name"

  create_table "features", :force => true do |t|
    t.string   "name"
    t.boolean  "for_hotel"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "active",     :default => true
  end

  create_table "features_hotels", :id => false, :force => true do |t|
    t.integer "hotel_id"
    t.integer "feature_id"
  end

  create_table "features_rooms", :id => false, :force => true do |t|
    t.integer "room_id"
    t.integer "feature_id"
  end

  create_table "feedbacks", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "subject"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parent_id"
  end

  create_table "hotel_translations", :force => true do |t|
    t.integer "hotel_id"
    t.string  "locale"
    t.string  "name"
    t.text    "description"
    t.text    "address"
  end

  create_table "hotels", :force => true do |t|
    t.integer  "district_id"
    t.integer  "division_id"
    t.string   "phone"
    t.string   "email"
    t.string   "contact_person"
    t.integer  "user_id"
    t.boolean  "active",         :default => true
    t.boolean  "featured",       :default => false
    t.integer  "rating"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "category_id",    :default => 1
    t.integer  "star_rating"
    t.string   "discount"
    t.date     "discount_till"
    t.string   "latitude"
    t.string   "longitude"
    t.integer  "total_rooms",    :default => 0
    t.float    "starting_price", :default => 0.0
  end

  create_table "hotels_spots", :id => false, :force => true do |t|
    t.integer "hotel_id"
    t.integer "spot_id"
  end

  create_table "memberships", :force => true do |t|
    t.integer  "user_id"
    t.integer  "memberable_id"
    t.string   "memberable_type"
    t.boolean  "approved",           :default => false
    t.boolean  "leave_request",      :default => false
    t.datetime "leave_request_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "messages", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "address"
    t.string   "phone"
    t.text     "content"
    t.integer  "created_by"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "read",       :default => false
    t.integer  "user_id"
    t.string   "title"
    t.integer  "ref_id"
    t.integer  "parent_id"
    t.string   "ref_type"
  end

  create_table "package_event_translations", :force => true do |t|
    t.integer  "package_event_id"
    t.string   "locale"
    t.string   "time"
    t.text     "detail"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "package_events", :force => true do |t|
    t.integer  "package_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "package_itineraries", :force => true do |t|
    t.integer  "package_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "package_itinerary_translations", :force => true do |t|
    t.integer  "package_itinerary_id"
    t.string   "locale"
    t.string   "title"
    t.text     "detail"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "package_translations", :force => true do |t|
    t.integer  "package_id"
    t.string   "locale"
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "short_description"
    t.string   "location"
    t.string   "price_includes"
    t.string   "price_excludes"
  end

  create_table "package_videos", :force => true do |t|
    t.integer  "package_id"
    t.string   "code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "package_videos", ["package_id"], :name => "index_ad_videos_on_ad_id"

  create_table "packages", :force => true do |t|
    t.integer  "category_id"
    t.integer  "user_id"
    t.string   "ad_name"
    t.string   "short_description"
    t.float    "price"
    t.integer  "district_id"
    t.integer  "division_id"
    t.string   "phone"
    t.boolean  "active",                                          :default => false
    t.boolean  "featured",                                        :default => false
    t.date     "expire_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "discount"
    t.date     "discount_till"
    t.date     "start_date"
    t.date     "end_date"
    t.boolean  "price_per_person",                                :default => true
    t.string   "email"
    t.decimal  "rating_average",    :precision => 6, :scale => 2, :default => 0.0
    t.integer  "tour_operator_id"
  end

  add_index "packages", ["category_id", "user_id"], :name => "index_ads_on_category_id_and_user_id"
  add_index "packages", ["district_id", "division_id", "active"], :name => "index_ads_on_district_id_and_division_id_and_active"
  add_index "packages", ["featured"], :name => "index_ads_on_featured"
  add_index "packages", ["user_id"], :name => "index_ads_on_user_id"

  create_table "packages_destinations", :id => false, :force => true do |t|
    t.integer "package_id"
    t.integer "district_id"
  end

  create_table "packages_spots", :id => false, :force => true do |t|
    t.integer "package_id"
    t.integer "spot_id"
  end

  create_table "policies", :force => true do |t|
    t.integer  "policiable_id"
    t.string   "policiable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "policy_translations", :force => true do |t|
    t.integer "policy_id"
    t.string  "locale"
    t.text    "title"
    t.text    "detail"
  end

  create_table "profile_translations", :force => true do |t|
    t.integer  "profile_id"
    t.string   "locale"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "address"
    t.text     "about"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "profile_translations", ["profile_id", "locale"], :name => "index_profile_translations_on_profile_id_and_locale"

  create_table "profiles", :force => true do |t|
    t.integer  "user_id"
    t.string   "district"
    t.string   "division"
    t.string   "zip_code"
    t.integer  "country_id"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "rates", :force => true do |t|
    t.integer  "rater_id"
    t.integer  "rateable_id"
    t.string   "rateable_type"
    t.integer  "stars",         :null => false
    t.string   "dimension"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rates", ["rateable_id", "rateable_type"], :name => "index_rates_on_rateable_id_and_rateable_type"
  add_index "rates", ["rater_id"], :name => "index_rates_on_rater_id"

  create_table "rooms", :force => true do |t|
    t.integer  "hotel_id"
    t.string   "name"
    t.text     "description"
    t.float    "price"
    t.boolean  "active",      :default => true
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "total_room"
    t.integer  "user_id"
  end

  create_table "saved_listings", :force => true do |t|
    t.integer  "user_id"
    t.integer  "savable_id"
    t.string   "savable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "slugs", :force => true do |t|
    t.string   "name"
    t.integer  "sluggable_id"
    t.integer  "sequence",                     :default => 1, :null => false
    t.string   "sluggable_type", :limit => 40
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "slugs", ["name", "sluggable_type", "sequence", "scope"], :name => "index_slugs_on_n_s_s_and_s", :unique => true
  add_index "slugs", ["sluggable_id"], :name => "index_slugs_on_sluggable_id"

  create_table "spot_translations", :force => true do |t|
    t.integer  "spot_id"
    t.string   "locale"
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "short_description"
    t.text     "textilize_description"
    t.text     "history"
    t.text     "how_to_go"
    t.text     "where_to_stay"
  end

  create_table "spots", :force => true do |t|
    t.integer  "category_id"
    t.integer  "district_id"
    t.integer  "division_id"
    t.integer  "country_id"
    t.string   "zip_code"
    t.string   "phone"
    t.integer  "user_id"
    t.boolean  "active",      :default => true
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "latitude"
    t.string   "longitude"
  end

  add_index "spots", ["category_id", "user_id"], :name => "index_spots_on_category_id_and_user_id"
  add_index "spots", ["division_id", "district_id", "active"], :name => "index_spots_on_division_id_and_district_id_and_active"
  add_index "spots", ["user_id"], :name => "index_spots_on_user_id"
  add_index "spots", ["zip_code", "active"], :name => "index_spots_on_zip_code_and_active"

  create_table "spots_tour_operators", :id => false, :force => true do |t|
    t.integer "spot_id"
    t.integer "tour_operator_id"
  end

  create_table "spots_transports", :id => false, :force => true do |t|
    t.integer "transport_id"
    t.integer "spot_id"
  end

  add_index "spots_transports", ["transport_id", "spot_id"], :name => "index_transports_spots_on_transport_id_and_spot_id"

  create_table "static_pages", :force => true do |t|
    t.string   "name"
    t.string   "permalink"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "taggings", :force => true do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id"], :name => "index_taggings_on_tag_id"
  add_index "taggings", ["taggable_id", "taggable_type"], :name => "index_taggings_on_taggable_id_and_taggable_type"

  create_table "tags", :force => true do |t|
    t.string "name"
  end

  create_table "title_detail_attribute_translations", :force => true do |t|
    t.integer "title_detail_attribute_id"
    t.string  "locale"
    t.string  "title"
    t.text    "detail"
  end

  create_table "title_detail_attributes", :force => true do |t|
    t.integer  "td_attributable_id"
    t.string   "td_attributable_type"
    t.string   "td_association_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tour_club_translations", :force => true do |t|
    t.integer "tour_club_id"
    t.string  "locale"
    t.string  "name"
    t.text    "description"
  end

  create_table "tour_clubs", :force => true do |t|
    t.integer  "user_id"
    t.boolean  "active"
    t.string   "logo_file_name"
    t.string   "logo_content_type"
    t.integer  "logo_file_size"
    t.integer  "members_count"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tour_operator_translations", :force => true do |t|
    t.integer "tour_operator_id"
    t.string  "locale"
    t.string  "name"
    t.text    "address"
    t.text    "description"
  end

  create_table "tour_operators", :force => true do |t|
    t.integer  "category_id"
    t.integer  "user_id"
    t.boolean  "active"
    t.string   "logo_file_name"
    t.string   "logo_content_type"
    t.integer  "logo_file_size"
    t.integer  "packages_count"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "web"
    t.boolean  "featured",          :default => false
  end

  create_table "tr_uploaded_images", :force => true do |t|
    t.string   "label"
    t.integer  "user_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "transport_translations", :force => true do |t|
    t.integer  "transport_id"
    t.string   "locale"
    t.string   "name"
    t.text     "description"
    t.text     "address"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "transports", :force => true do |t|
    t.integer  "user_id"
    t.string   "web"
    t.boolean  "active",      :default => true
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "category_id"
    t.boolean  "featured",    :default => false
  end

  create_table "transports_destinations", :id => false, :force => true do |t|
    t.integer "transport_id"
    t.integer "district_id"
  end

  add_index "transports_destinations", ["transport_id", "district_id"], :name => "index_transports_destinations_on_transport_id_and_district_id"

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "crypted_password"
    t.string   "password_salt"
    t.string   "persistence_token"
    t.string   "single_access_token"
    t.string   "perishable_token"
    t.integer  "login_count",            :default => 0,    :null => false
    t.integer  "failed_login_count",     :default => 0,    :null => false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string   "current_login_ip"
    t.string   "last_login_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "role"
    t.boolean  "message_notification",   :default => true
    t.string   "preferred_input_method"
    t.string   "preferred_locale",       :default => "bn"
  end

  add_index "users", ["email", "crypted_password"], :name => "index_users_on_email_and_crypted_password"

end
