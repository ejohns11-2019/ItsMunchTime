class Api::OrdersController < ApplicationController
  #before_action :authenticate_user!

    def index
      render json: Order.all
    end

    def create
        users = User.all
        users.each do |user|
          order = user.orders.new(order_params)
          render json: { errors: order.errors }, status: :unprocessable_entity unless order.save
        end
       render json: Order.all
    end

    def update
        users = User.all
        users.each do |user|
          order = Order.where(params[:current] = true)
          order.update(order_params)
        end
        render json: Order.all
    end

    def current_to_false
        users = User.all
        users.each do |user|
          order = Order.where(params[:current] == true)
          order.update(current: params[:current])
        end
        render json: Order.all
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

    def current_orders
      render json: Order.current_orders
    end

    private
      def order_params
        params.require(:order).permit(:user_id, :ticket, :restaurant_id, :current, :order_date)
      end
  end
