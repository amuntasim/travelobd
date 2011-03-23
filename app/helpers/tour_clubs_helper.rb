module TourClubsHelper
  def join_or_leave_club(tour_club)
   return link_to('Login to join', login_path) unless current_user

    if current_user.requested_member_of?(tour_club)
       return link_to('Leave this club', 'javascript:void()', :club_id => tour_club.id, :class => 'join_club')
    else
       return link_to('Join this club',  'javascript:void()', :club_id => tour_club.id, :class => 'leave_club')
    end
  end
end
