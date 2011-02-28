class AddStarRatingToHotels < ActiveRecord::Migration
  def self.up
    add_column :hotels, :star_rating, :integer
  end

  def self.down
    remove_column :hotels, :star_rating
  end
end
