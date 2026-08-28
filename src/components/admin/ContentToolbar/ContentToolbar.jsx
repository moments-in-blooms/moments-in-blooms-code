import { FiSearch } from 'react-icons/fi'
import { SelectField, TextField } from '../../FormField/index.js'
import {
  ToolbarCount,
  ToolbarFilter,
  ToolbarRow,
  ToolbarShell,
} from './ContentToolbar.styles.js'

function ContentToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search…',
  filters = [],
  count,
  countLabel = 'items',
}) {
  return (
    <ToolbarShell>
      <ToolbarRow>
        <TextField
          aria-label="Search content"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
        />
        {filters.map((filter) => (
          <ToolbarFilter key={filter.key}>
            <SelectField
              aria-label={filter.label}
              value={filter.value}
              onChange={(event) => filter.onChange(event.target.value)}
              options={filter.options}
              placeholder={filter.placeholder}
            />
          </ToolbarFilter>
        ))}
      </ToolbarRow>
      {typeof count === 'number' ? (
        <ToolbarCount>
          <FiSearch aria-hidden="true" size={13} />
          {count} {countLabel}
        </ToolbarCount>
      ) : null}
    </ToolbarShell>
  )
}

export default ContentToolbar