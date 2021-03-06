FactoryGirl.define do
  factory :quantification_value, class: 'Quantification::Value' do
    location
    association :label, factory: :quantification_label
    year '2025'
    first_value 1.5
  end
end
