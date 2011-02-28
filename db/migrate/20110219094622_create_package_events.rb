class CreatePackageEvents < ActiveRecord::Migration
  def self.up
    create_table :package_events do |t|
      t.integer :package_id

      t.timestamps
    end

    create_table :package_event_translations do |t|
      t.integer :package_event_id
      t.string :locale
      t.string :time
      t.text :detail

      t.timestamps
    end


  end

  def self.down
    drop_table :package_events
    drop_table :package_event_translations
  end
end
