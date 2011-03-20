class CreateDepartureSchedules < ActiveRecord::Migration
  def self.up
    create_table :departure_schedules do |t|
      t.integer :transport_id
      t.timestamps
    end

    create_table :departure_schedule_translations do |t|
      t.integer :departure_schedule_id
      t.string :locale
      t.string :route
      t.text :time
    end
  end

  def self.down
    drop_table :departure_schedules
    drop_table :departure_schedule_translations
  end
end
