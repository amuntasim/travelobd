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

ActiveRecord::Schema.define(:version => 20101104135943) do

  create_table "ad_assets", :force => true do |t|
    t.integer  "ad_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "main",               :default => false
  end

  add_index "ad_assets", ["ad_id"], :name => "index_ad_assets_on_ad_id"

  create_table "ad_associations", :force => true do |t|
    t.integer  "ad_id"
    t.integer  "association_id"
    t.string   "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ad_associations", ["ad_id", "association_id"], :name => "index_ad_associations_on_ad_id_and_association_id"

  create_table "ad_disciplines", :force => true do |t|
    t.integer  "ad_id"
    t.integer  "discipline_id"
    t.string   "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ad_disciplines", ["ad_id", "discipline_id"], :name => "index_ad_disciplines_on_ad_id_and_discipline_id"

  create_table "ad_types", :force => true do |t|
    t.string   "name"
    t.boolean  "active",     :default => true
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ad_videos", :force => true do |t|
    t.integer  "ad_id"
    t.string   "code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ad_videos", ["ad_id"], :name => "index_ad_videos_on_ad_id"

  create_table "ads", :force => true do |t|
    t.string   "title",                                :null => false
    t.integer  "category_id"
    t.integer  "breed_id"
    t.integer  "user_id"
    t.string   "horse_name"
    t.string   "short_description"
    t.float    "price"
    t.date     "birth_date"
    t.integer  "temperament",                          :null => false
    t.integer  "city_id"
    t.integer  "state_id"
    t.integer  "country_id"
    t.string   "zip_code"
    t.string   "phone"
    t.string   "gender"
    t.text     "description"
    t.boolean  "active",            :default => false
    t.boolean  "featured",          :default => false
    t.date     "expires_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "height"
  end

  add_index "ads", ["category_id", "user_id"], :name => "index_ads_on_category_id_and_user_id"
  add_index "ads", ["city_id", "state_id", "active"], :name => "index_ads_on_city_id_and_state_id_and_active"
  add_index "ads", ["featured"], :name => "index_ads_on_featured"
  add_index "ads", ["price", "zip_code", "active"], :name => "index_ads_on_price_and_zip_code_and_active"
  add_index "ads", ["user_id"], :name => "index_ads_on_user_id"
  add_index "ads", ["zip_code", "active"], :name => "index_ads_on_zip_code_and_active"

  create_table "article_assets", :force => true do |t|
    t.integer  "article_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "main",               :default => false
  end

  create_table "articles", :force => true do |t|
    t.string   "title"
    t.text     "detail"
    t.integer  "user_id"
    t.boolean  "active",      :default => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "category_id"
  end

  create_table "associations", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "breeds", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "carts", :force => true do |t|
    t.datetime "purchased_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

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
    t.integer  "city_id"
    t.integer  "state_id"
    t.integer  "country_id"
    t.string   "zip_code"
    t.string   "phone"
    t.integer  "user_id"
    t.boolean  "active",      :default => true
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "classifieds", ["category_id", "user_id"], :name => "index_classifieds_on_category_id_and_user_id"
  add_index "classifieds", ["state_id", "city_id", "active"], :name => "index_classifieds_on_state_id_and_city_id_and_active"
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
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "division_id"
  end

  add_index "districts", ["country_id"], :name => "index_cities_on_country_id"

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

  create_table "feedbacks", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "subject"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parent_id"
  end

  create_table "line_items", :force => true do |t|
    t.float    "price"
    t.integer  "cart_id"
    t.integer  "quantity"
    t.integer  "purchasable_id"
    t.string   "purchasable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
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
    t.integer  "user_id"
    t.boolean  "read",       :default => false
    t.string   "title"
    t.integer  "ref_id"
    t.integer  "parent_id"
    t.string   "ref_type"
  end

  add_index "messages", ["seller_id"], :name => "index_messages_on_seller_id"

  create_table "order_transactions", :force => true do |t|
    t.integer  "order_id"
    t.string   "action"
    t.float    "amount"
    t.boolean  "success"
    t.string   "authorization"
    t.string   "message"
    t.text     "params"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "orders", :force => true do |t|
    t.integer  "cart_id"
    t.string   "ip_address"
    t.string   "first_name"
    t.string   "address"
    t.string   "suite"
    t.string   "city"
    t.string   "state"
    t.string   "zip_code"
    t.string   "country"
    t.string   "phone"
    t.string   "email"
    t.string   "name_on_card"
    t.string   "card_type"
    t.date     "card_expires_on"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "last_name"
  end

  create_table "pedigrees", :force => true do |t|
    t.string   "name"
    t.boolean  "active"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "position",   :default => 0, :null => false
    t.integer  "ad_id"
    t.integer  "child_id"
  end

  create_table "profiles", :force => true do |t|
    t.integer  "user_id"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.string   "zip_code"
    t.integer  "country_id"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "saved_listings", :force => true do |t|
    t.integer  "user_id"
    t.integer  "savable_id"
    t.string   "savable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "spot_assets", :force => true do |t|
    t.integer  "directory_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "main",               :default => false
  end

  add_index "spot_assets", ["directory_id"], :name => "index_directory_assets_on_directory_id"

  create_table "spots", :force => true do |t|
    t.integer  "category_id"
    t.string   "name"
    t.text     "detail"
    t.integer  "country_id"
    t.string   "zip_code"
    t.string   "phone"
    t.integer  "user_id"
    t.boolean  "active",      :default => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "city_id"
    t.integer  "state_id"
  end

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

end
