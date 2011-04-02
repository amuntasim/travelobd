class RenameParmalinkToPermalink < ActiveRecord::Migration
  def self.up
    rename_column(:static_pages, :parmalink, :permalink)
  end

  def self.down
    rename_column(:static_pages, :permalink, :parmalink)
  end
end
