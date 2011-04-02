class ChangePackageContactToContactable < ActiveRecord::Migration
  def self.up
    rename_table :package_contacts, :contacts
    rename_table :package_contact_translations, :contact_translations
    rename_column :contacts, :package_id, :contactable_id
    rename_column :contact_translations, :package_contact_id, :contact_id
    add_column :contacts, :contactable_type, :string
  end

  def self.down
    rename_table :contacts, :package_contacts
    rename_table :contact_translations, :package_contact_translations
    rename_column :package_contacts, :contactable_id, :package_id
    rename_column :package_contact_translations, :contact_id, :package_contact_id
    remove_column :package_contacts, :contactable_type
  end
end
