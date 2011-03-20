class CreateTitleDetailAttributes < ActiveRecord::Migration
  def self.up
    create_table :title_detail_attributes do |t|
      t.integer :td_attributable_id
      t.string :td_attributable_type
      t.string :td_association_type
      t.timestamps
    end


    create_table :title_detail_attribute_translations do |t|
      t.integer :title_detail_attribute_id
      t.string :locale
      t.string :title
      t.text :detail
    end
  end

  def self.down
    drop_table :title_detail_attributes
    drop_table :title_detail_attribute_translations
  end
end
