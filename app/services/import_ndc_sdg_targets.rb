require 'csv'

class ImportNdcSdgTargets
  NDC_SDG_TARGETS = "#{CW_FILES_PREFIX}sdgs/ndc_sdg_targets.csv"

  def call
    @failed_lines = []

    cleanup
    import_ndc_sdg_targets(S3CSVReader.read(NDC_SDG_TARGETS))
  end

  private

  def cleanup
    NdcSdg::NdcTargetSector.delete_all
    NdcSdg::NdcTarget.delete_all
    NdcSdg::Sector.delete_all
  end

  def import_ndc_sdg_targets(content)
    content.each.with_index(2) do |row|
      row[:indc_text] = TextNormalizer.normalize(row[:indc_text])
      ndc = ndc(row)
      target = target(row)

      unless ndc && target
        @failed_lines.append(row)
        next
      end

      indc_text = row[:indc_text]
      starts_at = ndc.full_text.downcase.index(indc_text.downcase)
      ends_at = starts_at + indc_text.length - 1 if starts_at
      ndc_target = NdcSdg::NdcTarget.find_or_create_by(
        ndc: ndc,
        target: target,
        indc_text: indc_text,
        status: row[:status],
        climate_response: row[:climate_response],
        type_of_information: row[:type_of_information],
        starts_at: starts_at,
        ends_at: ends_at
      )
      import_ndc_target_sectors(row, ndc_target)
    end

    unless @failed_lines.empty?
      CSV.open("#{Rails.root}/tmp/ndc_sdg_targets_failed_rows.csv", 'wb') do |csv|
        csv << @failed_lines.first.headers
        @failed_lines.each do |line|
          csv << line
        end
      end
    end
  end

  def import_ndc_target_sectors(row, ndc_target)
    sectors = row[:sector] && row[:sector].split(',').map(&:strip).uniq ||
      []
    sectors.each do |sector|
      sector_rec = NdcSdg::Sector.where('name ilike ?', sector).first
      sector_rec = NdcSdg::Sector.create(name: sector) unless sector_rec
      NdcSdg::NdcTargetSector.create(
        ndc_target: ndc_target,
        sector: sector_rec
      )
    end
  end

  def ndc(row)
    iso_code3 = row[:iso_code3] && row[:iso_code3].upcase
    location = iso_code3 && Location.find_by_iso_code3(iso_code3)
    unless location
      Rails.logger.error "Location not found #{row}"
      return nil
    end
    indc_text = row[:indc_text]
    ndc = location.ndcs.detect do |n|
      !n.full_text.downcase.index(indc_text.downcase).nil?
    end

    Rails.logger.error "NDC not found #{row}" unless ndc
    ndc
  end

  def target(row)
    target_number = row[:target] && row[:target].downcase
    target = NdcSdg::Target.find_by_number(target_number)
    Rails.logger.error "SDG target not found #{row}" unless target
    target
  end
end
