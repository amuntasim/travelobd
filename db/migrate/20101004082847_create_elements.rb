class CreateElements < ActiveRecord::Migration
  def self.up
    create_table :elements do |t|
      t.string :name
      t.string :value

      t.timestamps
    end

    [["basic_package_price", "4.95"], ["basic_package_duration", "3"], ["basic_package_photos", "0"], ["basic_package_videos", "0"], ["featured_package_price", "9.95"], ["featured_package_duration", "6"], ["featured_package_photos", "15"], ["featured_package_videos", "2"]].each do |el|
      Element.create(:name=> el[0], :value => el[1])
    end
    add_index(:elements, :name)
  end

  def self.down
    drop_table :elements
  end
end
