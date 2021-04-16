describe Api::V1::UsersController do
  let(:aws_user) { create(:user, :aws_user) }
  let(:user) { create(:user) }

  describe 'POST #create' do
    context 'when authenticate' do
      context 'when aws user' do
        before do
          token = JsonWebToken.encode({ sub: aws_user.sub })
          request.headers['Authorization'] = "Bearer  #{token}"
        end

        it 'return success' do
          post :create, params: attributes_for(:user), format: :json
          expect(response.status).to be 200
        end

        it 'create user' do
          expect do
            post :create, params: attributes_for(:user), format: :json
          end.to change(User, :count).by(1)
        end
      end

      context 'when regular user' do
        before do
          token = JsonWebToken.encode({ sub: user.sub })
          request.headers['Authorization'] = "Bearer  #{token}"
        end

        it 'return forbidden' do
          post :create, params: attributes_for(:user), format: :json
          expect(response.status).to be 403
        end
      end
    end

    context 'when not authenticated' do
      it 'return unauthorized' do
        post :create, params: attributes_for(:user), format: :json
        expect(response.status).to be 401
      end
    end
  end
end
