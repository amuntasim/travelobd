class CartsController < ApplicationController
  
  def show
    @cart = current_cart
    @package_current_step =  4  unless session[:ad_checkout].nil?
    @order = Order.new
  end

  
end
