class AssetsController < ApplicationController
  def update_label
     @asset = Asset.find(params[:asset_id])
     @asset.update_attribute(:photo_label, params[:asset_label])
  end
end
