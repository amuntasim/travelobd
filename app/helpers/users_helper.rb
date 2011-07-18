module UsersHelper
  def active_inactive_dashboard_navigation(nav_name)
    @active_dashboard_nav == nav_name ? 'active' : ''
  end
end
