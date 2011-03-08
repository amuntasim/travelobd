class CreatePackageContacts < ActiveRecord::Migration
  def self.up
    create_table :package_contacts do |t|
      t.integer :package_id
      t.string :email
      t.string :phone
      t.timestamps
    end

    create_table :package_contact_translations do |t|
      t.integer :package_contact_id
      t.string :locale
      t.string :name
      t.text :address

      t.timestamps
    end
  end

  def self.down
    drop_table :package_contacts
    drop_table :package_contact_translations
  end
end
