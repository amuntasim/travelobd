class Asset < ActiveRecord::Base
  has_attached_file :photo, :styles => {:medium => "400x300", :thumb => "80x70>"},
                    :url => "/assets/common_photos/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/assets/common_photos/:id/:style/:basename.:extension"

  belongs_to :assetable, :polymorphic => true
  attr_accessor :photo_label
  before_save :update_localized_label

  def label
    I18n.locale == :bn ? label_bn : label_en
  end

  private
  def update_localized_label
    if I18n.locale == :bn
      self.label_bn = photo_label
    else
      self.label_en = photo_label
    end
  end
end
