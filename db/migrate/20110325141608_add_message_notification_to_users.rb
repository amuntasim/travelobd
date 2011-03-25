class AddMessageNotificationToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :message_notification, :boolean, :default => true
  end

  def self.down
    remove_column :users, :message_notification
  end
end
