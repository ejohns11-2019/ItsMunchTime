class Api::OrdersController < ApplicationController
  #before_action :authenticate_user!

    def index
      render json: Order.all
    end

    def show
      render json: Order.find(params[:id])
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
      order = Order.where({id: params[:id]})
      order.update(ticket: params[:ticket])
      render json: order
    end
 
    def current_to_false 
        orders = Order.where(current: true)
        orders.each { |order| order.update(current: params[:current])}
        render json: Order.all
    end

    def destroy
      if current_user.adimn == true
        User.each { |user|  user.ordres.find(params[:id]).destroy}
        render json: { message: 'Order was deleted' }
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

    def user_history
      id = current_user.id 
      render json: Order.user_history(id)
    end

    private
      def order_params
        params.require(:order).permit(:user_id, :ticket, :restaurant_id, :current, :order_date)
      end
  end
