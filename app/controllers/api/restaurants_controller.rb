class Api::RestaurantsController < ApplicationController
  before_action :authenticate_user!, except: :index

  def index
    render json: Restaurant.all
  end

  def show
    render json: Restaurant.find(params[:id])
  end
  
  def create
    if current_user.admin == true
      @restaurant = Restaurant.new(restaurant_params)
      if @restaurant.save
        render json: @restaurant
      else
        render json: { errors: @restaurant.errors }, status: :unprocessable_entity
      end
    else
      render json: {message: "Unauthorized Access"}, status: 401
    end
   
  end

  def update
    if current_user.admin == true
      @restaurant = Restaurant.find(params[:id])
      if @restaurant.update(restaurant_params)
        render json: @restaurant
      else
        render json: { errors: @restaurant.errors }, status: :unprocessable_entity
      end
    else
      render json: {message: "Unauthorized Access"}, status: 401
    end
  end

  def destroy
    if current_user.admin == true
      @restaurant = Restaurant.find(params[:id]).destroy
      render json: {message: "Restaurant Deleted"}
    else
      render json: {message: "Unauthorized Access"}, status: 401
    end
  end
  
  private
    def restaurant_params
      # t.string "name"
      # t.string "address"
      # t.string "phone"
      # t.text "menu"
      params.require(:restaurant).permit(:name, :address, :phone, :menu)
    end

 end
