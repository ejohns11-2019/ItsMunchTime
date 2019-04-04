class Api::OrdersController < ApplicationController
  def index
    render json: Order.all
  end

  def create
    order = current_user.orders.new(order_params)
    if item.save
      render json: item
    else
      render json: { errors: item.errors }, status: :unprocessable_entity 
    end
  end

  def update
    item = Item.find(params[:id])
    item.update(complete: !item.complete)
    render json: item
  end

  def destroy
    Item.find(params[:id]).destroy
    render json: { message: 'Item deleted' }
  end

  private

  def item_params
    params.require(:order).permit(:name, :ticket, :current, :order_date)
  end

end
