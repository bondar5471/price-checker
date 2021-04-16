require 'faker'

FactoryBot.define do
  factory :user do
    sub { Faker::String.random(length: 10) }

    trait :aws_user do
      role { :aws }
    end
  end
end
