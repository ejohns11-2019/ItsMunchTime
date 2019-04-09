class Api::OrdersController < ApplicationController
#before_action :authenticate_user!

  def index
    render json: Order.all
  end

  def create
    if current_user.adimn == true
      users = User.find(params[:group] == full_time)
      users.each do |user|
        order = user.orders.new(order_params)
        if order.save
          render json: order
        else
          render json: { errors: order.errors }, status: :unprocessable_entity
        end
      end
    end
  end

  def update
    if current_user.admin == false
      order = current_user.orders.find(params[:id])
      order.update(order_params)
      render json: order
    else
      #add logic for admin user to be able to update any users order
      regular_user = User.find([:id])
      order = regular_user.orders.find(params[:id])
      order.update(order_params)
      render json: order
    end
  end

  def destroy
    if current_user.adimn == true
      User.each { |user|  user.ordres.find(params[:id]).destroy}
      render json: { message: 'Order was deleted deleted' }
    end
  end

  private
    def order_params
      params.require(:order).permit(:user_id, :ticket, :restaurant_id, :current, :order_date)
    end
end
