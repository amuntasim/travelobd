class AddPreferredLocaleToUser < ActiveRecord::Migration
  def self.up
    add_column :users, :preferred_locale, :string, :default => 'bn'
  end

  def self.down
    remove_column :users, :preferred_locale
  end
end
