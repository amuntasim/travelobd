class OrdersController < ApplicationController
  def new
  end

  def create
    @order = Order.new(params[:order].merge({:cart_id => current_cart.id}))
    @order.ip_address = request.remote_ip
    if @order.save
      if @order.purchase
        current_cart.purchased
        redirect_to dashboard_url, :notice=> 'checkout successfull!'
      else
        redirect_to checkout_url, :alert => 'checkout failed!'
      end
    else
      redirect_to checkout_url
    end

  end

end
