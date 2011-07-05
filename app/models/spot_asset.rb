class SpotAsset < ActiveRecord::Base
  has_attached_file :photo, :styles => {:medium => "680x280!", :home_pg => "505x230!", :thumb => "215x152!", :thumb_s => "60x51!"},
                    :url => "/assets/common_photos/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/assets/common_photos/:id/:style/:basename.:extension"
  validates_attachment_presence :photo
  validates_attachment_size :photo, :less_than => 2.megabytes

  belongs_to :spot
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
