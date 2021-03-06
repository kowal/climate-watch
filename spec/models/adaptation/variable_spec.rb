require 'rails_helper'

RSpec.describe Adaptation::Variable, type: :model do
  it 'should be invalid when slug not present' do
    expect(
      FactoryGirl.build(:adaptation_variable, slug: nil)
    ).to have(1).errors_on(:slug)
  end

  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:adaptation_variable, name: nil)
    ).to have(1).errors_on(:name)
  end
end
