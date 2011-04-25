module TourClubsHelper
  def join_or_leave_club(tour_club)
    return link_to('Login to join', login_path) unless current_user

    if current_user.member_of?(tour_club)
      return "<span>You are a member of this club </span> #{link_to('Leave this club', 'javascript:void()', :club_id => tour_club.id, :class => 'join_club search_button')} <span class='search_button_right'> </span>"
    elsif current_user.requested_member_of?(tour_club)
      return "<span>You have requested to join to this club </span>#{link_to('Leave this club', 'javascript:void()', :club_id => tour_club.id, :class => 'join_club search_button')} <span class='search_button_right'> </span>"
    else
      return "#{link_to('Join this club', 'javascript:void()', :club_id => tour_club.id, :class => 'leave_club search_button')} <span class='search_button_right'> </span>"
    end
  end
end

