class JsonWebToken
  class << self
    def encode(payload, exp = 1.hours.from_now)
      # Set token expiry time
      payload[:exp] = exp.to_i

      # Encode the user data (payload) with secret key
      JWT.encode(payload, Rails.application.credentials.secret_key_base)
    end

    def decode(token)
      # Decode the token to get the user data (payload) with secret key
      body = JWT.decode(token, Rails.application.credentials.secret_key_base)[0]
      HashWithIndifferentAccess.new body

    # Raise custom error
    rescue JWT::ExpiredSignature, JWT::VerificationError => e
      raise ExceptionHandler::ExpiredSignature, e.message
    rescue JWT::DecodeError, JWT::VerificationError => e
      raise ExceptionHandler::DecodeError, e.message
    end
  end
end