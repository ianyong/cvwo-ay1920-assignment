class ApiController < ActionController::API
  include JSONAPI::ActsAsResourceController
  
  before_action :authenticate_request
  attr_reader :current_user

  # For access in resource classes
  def context
    {current_user: current_user}
  end
  
  include ExceptionHandler

  private
  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
end