# == Schema Information
#
# Table name: districts
#
#  id          :integer(4)      not null, primary key
#  country_id  :integer(4)
#  division_id :integer(4)
#  created_at  :datetime
#  updated_at  :datetime
#

class District < ActiveRecord::Base
  translates :name
  bangla_for_typus :name
  belongs_to :division
  validates :division_id, :presence => true
  validates :name, :presence => true

  #attr_accessor :name_bn
  scope :actives, where(:active => true).includes(:translations).order('district_translations.name')

#  def name_bn
#     self.translations.find_by_locale(:bn).name rescue ''
#  end
#
#  def name_bn=(name_bn)
#    unless name_bn.nil?
#      bn = self.translations.find_or_create_by_locale(:bn)
#      bn.name = name_bn
#      bn.save
#    end
#  end


end
