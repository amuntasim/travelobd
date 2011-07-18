# == Schema Information
#
# Table name: elements
#
#  id         :integer(4)      not null, primary key
#  name       :string(255)
#  value      :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Element < ActiveRecord::Base
  validates :name, :presence => true
  validates :value, :presence => true

  def self.package_settings
    items = Element.all(:conditions=>['name like ?', '%_package_%'])
    settings = {}
    items.each do |item|
      settings[item.name] = item.value
    end
    settings
  end
end
