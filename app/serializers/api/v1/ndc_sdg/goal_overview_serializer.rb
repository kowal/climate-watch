module Api
  module V1
    module NdcSdg
      class GoalOverviewSerializer < ActiveModel::Serializer
        attribute :id
        attribute :number
        attribute :locations
        attribute :targets
        attribute :colour

        def targets
          object.targets.map(&:number)
        end

        def locations
          targets = object.targets.
            flat_map do |target|
              target.ndc_targets.map do |ndc_target|
                [
                  ndc_target.ndc.location.iso_code3,
                  target.number
                ]
              end
            end

          targets.group_by(&:first).
            transform_values do |value|
              value.map(&:last).uniq.sort
            end
        end
      end
    end
  end
end
