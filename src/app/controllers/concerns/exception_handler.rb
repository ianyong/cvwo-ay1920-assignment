module ExceptionHandler
  extend ActiveSupport::Concern

   # Define custom error subclasses - rescue catches `StandardErrors`
  class AuthenticationError < StandardError; end
  class MissingToken < StandardError; end
  class InvalidToken < StandardError; end
  class ExpiredSignature < StandardError; end
  class DecodeError < StandardError; end
  
  included do
    # Define custom handlers
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
    rescue_from ExceptionHandler::AuthenticationError, with: :unauthorized
    rescue_from ExceptionHandler::MissingToken, with: :unauthorized
    rescue_from ExceptionHandler::InvalidToken, with: :unauthorized
    rescue_from ExceptionHandler::ExpiredSignature, with: :unauthorized
    rescue_from ExceptionHandler::DecodeError, with: :unprocessable_entity

    rescue_from ActiveRecord::RecordNotFound do |e|
     render json: { message: e.message }, status: :not_found
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      render json: { message: e.message }, status: :unprocessable_entity
    end
  end

  private

  def unprocessable_entity(e)
   render json: { message: e.message }, status: :unprocessable_entity
  end
 
  def unauthorized(e)
    render json: { message: e.message }, status: :unauthorized
  end
end