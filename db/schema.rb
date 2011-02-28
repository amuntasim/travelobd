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

ActiveRecord::Schema.define(:version => 20110228103422) do

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

  create_table "article_assets", :force => true do |t|
    t.integer  "article_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "main",               :default => false
  end

  add_index "article_assets", ["article_id"], :name => "index_article_assets_on_article_id"

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

  create_table "classified_assets", :force => true do |t|
    t.integer  "classified_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "main",               :default => false
  end

  add_index "classified_assets", ["classified_id"], :name => "index_classified_assets_on_classified_id"

  create_table "classifieds", :force => true do |t|
    t.integer  "category_id"
    t.string   "name"
    t.text     "detail"
    t.integer  "district_id"
    t.integer  "division_id"
    t.integer  "country_id"
    t.string   "zip_code"
    t.string   "phone"
    t.integer  "user_id"
    t.boolean  "active",      :default => true
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "classifieds", ["category_id", "user_id"], :name => "index_classifieds_on_category_id_and_user_id"
  add_index "classifieds", ["division_id", "district_id", "active"], :name => "index_classifieds_on_division_id_and_district_id_and_active"
  add_index "classifieds", ["user_id"], :name => "index_classifieds_on_user_id"
  add_index "classifieds", ["zip_code", "active"], :name => "index_classifieds_on_zip_code_and_active"

  create_table "countries", :force => true do |t|
    t.string   "name"
    t.string   "code"
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

  create_table "hotel_assets", :force => true do |t|
    t.integer  "hotel_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "main"
  end

  add_index "hotel_assets", ["hotel_id"], :name => "index_hotel_assets_on_hotel_id"

  create_table "hotels", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.text     "address"
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
  end

  create_table "messages", :force => true do |t|
    t.integer  "seller_id"
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

  add_index "messages", ["seller_id"], :name => "index_messages_on_seller_id"

  create_table "package_assets", :force => true do |t|
    t.integer  "package_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "main",               :default => false
  end

  add_index "package_assets", ["package_id"], :name => "index_ad_assets_on_ad_id"

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

  create_table "package_translations", :force => true do |t|
    t.integer  "package_id"
    t.string   "locale"
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "short_description"
    t.string   "location"
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
    t.boolean  "active",            :default => false
    t.boolean  "featured",          :default => false
    t.date     "expire_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "discount"
    t.date     "discount_till"
    t.date     "start_date"
    t.date     "end_date"
    t.text     "destinations"
    t.text     "destination"
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

  create_table "profiles", :force => true do |t|
    t.integer  "user_id"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "address"
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

  create_table "room_assets", :force => true do |t|
    t.integer  "room_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.boolean  "main",               :default => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "room_assets", ["room_id"], :name => "index_room_assets_on_room_id"

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

  create_table "spot_assets", :force => true do |t|
    t.integer  "spot_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "main",               :default => false
  end

  add_index "spot_assets", ["spot_id"], :name => "index_spot_assets_on_spot_id"

  create_table "spot_translations", :force => true do |t|
    t.integer  "spot_id"
    t.string   "locale"
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "short_description"
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
  end

  add_index "spots", ["category_id", "user_id"], :name => "index_spots_on_category_id_and_user_id"
  add_index "spots", ["division_id", "district_id", "active"], :name => "index_spots_on_division_id_and_district_id_and_active"
  add_index "spots", ["user_id"], :name => "index_spots_on_user_id"
  add_index "spots", ["zip_code", "active"], :name => "index_spots_on_zip_code_and_active"

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

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "crypted_password"
    t.string   "password_salt"
    t.string   "persistence_token"
    t.string   "single_access_token"
    t.string   "perishable_token"
    t.integer  "login_count",         :default => 0, :null => false
    t.integer  "failed_login_count",  :default => 0, :null => false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string   "current_login_ip"
    t.string   "last_login_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "role"
  end

  add_index "users", ["email", "crypted_password"], :name => "index_users_on_email_and_crypted_password"

end
