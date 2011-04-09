class Admin::UsersController < Admin::ResourcesController
  after_filter :check_and_set_role, :only => [:create, :update]

  private
  def check_and_set_role
    unless params[:user][:role].blank?
      @item.role = params[:user][:role]
      @item.save
    end
  end
end
