require 'rails_helper'

RSpec.describe ImportLocationMembers do
  subject { ImportLocationMembers.new.call }

  before :all do
    Aws.config[:s3] = {
      stub_responses: {
        get_object: {
          body: <<~END
            parent_iso_code3,name,iso_code3,,
            EU28,Poland,POL,,'
          END
        }
      }
    }
  end

  before(:each) do
    FactoryGirl.create(:location, iso_code3: 'EU28', location_type: 'GROUP')
    FactoryGirl.create(:location, iso_code3: 'POL', location_type: 'COUNTRY')
  end

  it 'Creates a new location member' do
    expect { subject }.to change { LocationMember.count }.by(1)
  end
end
