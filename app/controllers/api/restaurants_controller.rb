class Api::RestaurantsController < ApplicationController
#before_action :authenticate_user!
  def index
    render json: Restaurant.all
  end

  def create
    restaurant = Restaurant.new(restaurant_params)

    if restaurant.save
      render json: restaurant
    else
      render json: { errors: restaurant.errors }, status: :unprocessable_entity
    end
  end

  def update
    restaurant = Restaurant.find(params[:id])
    restaurant.update
    render json: restaurant
  end

  def destroy
    restaurant = Restaurant.find(params[:id]).destroy
    render json: {message: ‘Restaurant Deleted’}
  end

  def restaurant_params
    # t.string “name”
    # t.string “address”
    # t.string “phone”
    # t.text “menu”
    params.require(:restaurant).permit(:name, :address, :phone, :menu)
  end


 end
