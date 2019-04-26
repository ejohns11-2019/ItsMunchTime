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

    def delete_orders
      orders = Order.where(current: true)
      orders.each {|o| o.destroy}
      render json: { message: 'Order was deleted'}
    end

    def restaurant_history
      render json: Order.restaurant_history(params[:restaurant_id], params[:column], params[:direction])
      # binding.pry
    end

    def restaurant_visit_counter
      render json: Order.restaurant_visit_counter(params[:restaurant_id])
    end

    def current_orders
      render json: Order.current_orders
    end

    def user_history
      render json: Order.user_history(params[:user_id])
    end

    def user_history_last_five
      render json: Order.user_history_last_five(params[:user_id])
    end

    def check_current_order
      render json: Order.check_current_order()
    end

    def add_person_to_order
      current_order_date = Order.where(current: true).first.order_date
      current_order_rest = Order.where(current: true).first.restaurant_id
      user = User.find(params[:params][:user_id])

      order = user.orders.create(current: true, order_date:current_order_date, restaurant_id: current_order_rest )

      if order.save
        render json: order
      else
        render json: { errors: order.errors }, status: :unprocessable_entity 
      end
    end

    private
      def order_params
        params.require(:order).permit(:user_id, :ticket, :restaurant_id, :current, :order_date)
      end
  end
