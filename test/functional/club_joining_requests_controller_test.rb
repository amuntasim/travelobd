require 'test_helper'

class ClubJoiningRequestsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get show" do
    get :show
    assert_response :success
  end

  test "should get approve" do
    get :approve
    assert_response :success
  end

  test "should get deny" do
    get :deny
    assert_response :success
  end

  test "should get destroy" do
    get :destroy
    assert_response :success
  end

end
