class CreateMessages < ActiveRecord::Migration
  def self.up
    create_table :messages do |t|
      t.integer :seller_id
      t.string :name
      t.string :email
      t.string :address
      t.string :phone
      t.text :content
      t.integer :created_by

      t.timestamps
    end
    add_index(:messages, :seller_id)
  end

  def self.down
    drop_table :messages
  end
end
