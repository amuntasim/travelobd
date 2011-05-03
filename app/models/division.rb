# == Schema Information
#
# Table name: divisions
#
#  id         :integer(4)      not null, primary key
#  country_id :integer(4)
#  code       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Division < ActiveRecord::Base
  translates :name
  has_many :districts
  bangla_for_typus :name


  class << self
    def locations
      if (I18n.locale.to_s == 'en')
        @@en_locations
      else
        @@bn_locations
      end
    end

    def prepare_locations(locale)
      r_locations = {}
      backup_locale = I18n.locale
      I18n.locale = locale
      self.all.each do |d|
        r_locations[d.name] = d.districts.collect(&:id).join(',')
      end
      I18n.locale = backup_locale
      r_locations
    end
  end


  @@en_locations = prepare_locations(:en)
  @@bn_locations = prepare_locations(:bn)

end
