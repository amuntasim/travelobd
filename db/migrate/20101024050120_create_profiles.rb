class CreateProfiles < ActiveRecord::Migration
  def self.up
    create_table :profiles do |t|
      t.integer :user_id
      t.string :first_name
      t.string :last_name
      t.string :address
      t.string :district
      t.string :division
      t.string :zip_code
      t.integer :country_id
      t.string :avatar_file_name
      t.string :avatar_content_type
      t.integer :avatar_file_size
      t.timestamps
    end

    User.all.each do |user|
      Profile.create(:user_id => user.id, :first_name=> user.name) unless user.profile
    end
  end

  def self.down
    drop_table :profiles
  end
end
