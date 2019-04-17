class Api::OrdersController < ApplicationController
  #before_action :authenticate_user!

    def index
      render json: Order.all
    end

    def create
        users = User.all
        users.each do |user|
          @order = user.orders.new(order_params)
          if @order.save
            render json: @order
          else
          render json: { errors: order.errors }, status: :unprocessable_entity 
        end
    end

    def update
      if current_user.admin == true
        order = Order.find(params[:id])
        order.update(order_params)
        render json: order
      else
        #add logic for admin user to be able to update any users order
        regular_user = User.find([params: user_id])
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

    def restaurant_history
      render json: Order.restaurant_history(params[:restaurant_id])
    end

    def restaurant_visit_counter
      render json: Order.restaurant_visit_counter(params[:restaurant_id])
    end

    private
      def order_params
        params.require(:order).permit(:user_id, :ticket, :restaurant_id, :current, :order_date)
      end
  end
