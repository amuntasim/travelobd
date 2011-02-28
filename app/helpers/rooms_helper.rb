module RoomsHelper
  def room_feature_present?(room_feature)
    @room.feature_ids.include?(room_feature.id)
  end
end
