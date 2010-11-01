class Element < ActiveRecord::Base
  validates :name, :presence => true
  validates :value, :presence => true

  def self.ad_settings
    items = Element.all(:conditions=>['name like ?', '%_package_%'])
    settings = {}
    items.each do |item|
      settings[item.name] = item.value
    end
    settings
  end
end
