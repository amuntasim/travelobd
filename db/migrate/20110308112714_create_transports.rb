class CreateTransports < ActiveRecord::Migration
  def self.up
    create_table :transports do |t|
      t.integer :user_id
      t.string :web
      t.boolean :active

      t.timestamps
    end

    create_table :transport_translations do |t|
      t.column :transport_id, :integer
      t.column :locale, :string
      t.column :name, :string
      t.column :description, :text
      t.column :address, :text
      t.timestamps
    end
  end

  def self.down
    drop_table :transports
    drop_table :transport_translations
  end
end
