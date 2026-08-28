import { useEffect, useMemo, useState } from 'react'
import { FiDownload, FiEye, FiInbox, FiMail, FiSearch, FiTrash2 } from 'react-icons/fi'
import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import ConfirmDialog from '../../../components/admin/ConfirmDialog/index.js'
import DataTable from '../../../components/admin/DataTable/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import Modal from '../../../components/admin/Modal/index.js'
import StatusBadge from '../../../components/admin/StatusBadge/index.js'
import Button from '../../../components/Button/index.js'
import { showError, showSuccess } from '../../../utils/sweetAlert.js'
import { SelectField, TextField } from '../../../components/FormField/index.js'
import { adminPageMeta, ENQUIRY_STATUSES, enquiryStatusLabels } from '../../../constants/admin.js'
import { deleteEnquiry, listEnquiries, updateEnquiryStatus } from '../../../services/enquiries.js'
import {
  CardList,
  DetailGrid,
  DetailLabel,
  DetailValue,
  EnquiriesPage,
  EnquiryCard,
  EnquiryCardActions,
  EnquiryCardDetail,
  EnquiryCardFooter,
  EnquiryCardGrid,
  EnquiryCardHeader,
  EnquiryCardMessage,
  EnquiryCardMeta,
  EnquiryCardPair,
  EnquiryCardServices,
  EnquiryCardSkeletonLine,
  EnquiryCardTerm,
  FilterBar,
  FilterButton,
  LoadError,
  SearchWrap,
  TableCellActions,
  TableOnly,
  Toolbar,
} from './Enquiries.styles.js'

const STATUS_FILTERS = ['all', ...ENQUIRY_STATUSES]

const formatDate = (isoDate) => {
  if (!isoDate) return '—'
  try {
    return new Intl.DateTimeFormat('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}

const formatDateTime = (isoDate) => {
  if (!isoDate) return '—'
  try {
    return new Intl.DateTimeFormat('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}

const toCsv = (rows) => {
  const header = ['customer_name', 'email', 'phone', 'event_type', 'event_date', 'venue', 'guest_count', 'setup_required', 'selected_services', 'custom_inquiry', 'status', 'created_at']
  const escape = (value) => {
    const text = String(value ?? '')
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
  }
  return [header, ...rows.map((row) => header.map((key) => escape(row[key])))]
    .map((line) => line.join(','))
    .join('\n')
}

const servicesList = (enquiry) =>
  Array.isArray(enquiry?.selected_services) && enquiry.selected_services.length > 0
    ? enquiry.selected_services
    : null

function Enquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [statusError, setStatusError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    let mounted = true
    listEnquiries().then((result) => {
      if (!mounted) return
      setLoading(false)
      if (result.error) {
        setLoadError(result.error.message)
        return
      }
      setEnquiries(result.data ?? [])
    })
    return () => {
      mounted = false
    }
  }, [])



  const visible = useMemo(() => {
    const normalized = search.trim().toLowerCase()
    const filteredByStatus = enquiries.filter(
      (enquiry) => filter === 'all' || enquiry.status === filter,
    )
    if (!normalized) return filteredByStatus
    return filteredByStatus.filter((enquiry) =>
      [
        enquiry.customer_name,
        enquiry.email,
        enquiry.event_type,
        enquiry.venue,
        enquiry.phone,
      ]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(normalized)),
    )
  }, [enquiries, filter, search])

  const handleStatusChange = async (id, status) => {
    setStatusError(null)
    const result = await updateEnquiryStatus(id, status)
    if (result.data) {
      setEnquiries((current) =>
        current.map((enquiry) => (enquiry.id === id ? result.data : enquiry)),
      )
      setSelected((current) => (current?.id === id ? result.data : current))
      showSuccess('Updated', `Enquiry marked as ${status}.`)
      return
    }
    const msg = result.error?.message ?? "We couldn't update the status. Please try again."
    setStatusError(msg)
    showError('Update failed', msg)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget || isDeleting) return
    setIsDeleting(true)
    const result = await deleteEnquiry(deleteTarget.id)
    setIsDeleting(false)

    if (result.error) {
      setDeleteTarget(null)
      showError('Delete failed', result.error.message)
      return
    }

    setEnquiries((current) => current.filter((enquiry) => enquiry.id !== deleteTarget.id))
    setSelected((current) => (current?.id === deleteTarget.id ? null : current))
    setDeleteTarget(null)
    showSuccess('Deleted', 'Enquiry deleted successfully.')
  }

  const handleExport = () => {
    const csv = toCsv(enquiries)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const countFor = (status) =>
    status === 'all'
      ? enquiries.length
      : enquiries.filter((enquiry) => enquiry.status === status).length

  const statusOptions = ENQUIRY_STATUSES.map((status) => ({
    value: status,
    label: enquiryStatusLabels[status],
  }))

  const emptyState = (
    <EmptyState
      icon={<FiInbox aria-hidden="true" />}
      title={filter === 'all' ? 'No enquiries yet' : `No ${filter} enquiries`}
      description="Enquiries from the contact form will appear here."
    />
  )

  return (
    <EnquiriesPage>
      <AdminPageHeader
        {...adminPageMeta.enquiries}
        actions={
          <Button type="button" variant="outline" onClick={handleExport} disabled={enquiries.length === 0}>
            <FiDownload aria-hidden="true" size={15} />
            Export CSV
          </Button>
        }
      />

      <Toolbar>
        <FilterBar aria-label="Filter enquiries by status">
          {STATUS_FILTERS.map((status) => (
            <FilterButton
              key={status}
              type="button"
              aria-pressed={filter === status}
              $active={filter === status}
              onClick={() => setFilter(status)}
            >
              {status === 'all' ? 'All' : enquiryStatusLabels[status]}
              <span>{countFor(status)}</span>
            </FilterButton>
          ))}
        </FilterBar>
        <SearchWrap>
          <FiSearch aria-hidden="true" size={15} />
          <TextField
            aria-label="Search enquiries"
            type="search"
            placeholder="Search by name, email or event…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </SearchWrap>
      </Toolbar>

      {loadError ? <LoadError>{loadError}</LoadError> : null}
      {statusError ? <LoadError>{statusError}</LoadError> : null}

      <TableOnly>
        <DataTable
          loading={loading}
          caption="Enquiries"
          columns={[
            { key: 'name', header: 'Name', render: (row) => <strong>{row.customer_name ?? '—'}</strong> },
            { key: 'email', header: 'Email', render: (row) => row.email ?? '—' },
            { key: 'event', header: 'Event', render: (row) => row.event_type ?? '—' },
            { key: 'date', header: 'Date', render: (row) => formatDate(row.event_date) },
            {
              key: 'status',
              header: 'Status',
              render: (row) => (
                <SelectField
                  value={row.status ?? 'new'}
                  onChange={(event) => handleStatusChange(row.id, event.target.value)}
                  options={statusOptions}
                />
              ),
            },
            {
              key: 'actions',
              header: '',
              render: (row) => (
                <TableCellActions>
                  <Button type="button" variant="ghost" onClick={() => setSelected(row)}>
                    <FiEye aria-hidden="true" size={15} />
                    View
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => setDeleteTarget(row)}
                    title="Delete enquiry"
                  >
                    <FiTrash2 aria-hidden="true" size={15} />
                    Delete
                  </Button>
                </TableCellActions>
              ),
            },
          ]}
          rows={visible}
          rowKey={(row) => row.id}
          emptyState={emptyState}
        />
      </TableOnly>

      <CardList aria-label="Enquiries">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => <CardSkeleton key={index} />)
        ) : visible.length === 0 ? (
          emptyState
        ) : (
          visible.map((enquiry) => (
            <EnquiryCard key={enquiry.id}>
              <EnquiryCardHeader>
                <strong>{enquiry.customer_name ?? '—'}</strong>
                <StatusBadge status={enquiry.status ?? 'new'} />
              </EnquiryCardHeader>

              <EnquiryCardMeta>
                <span>{enquiry.email ?? 'No email'}</span>
                <span>{enquiry.phone ?? 'No phone number'}</span>
              </EnquiryCardMeta>

              <EnquiryCardGrid>
                <EnquiryCardPair>
                  <EnquiryCardTerm>Event type</EnquiryCardTerm>
                  <EnquiryCardDetail>{enquiry.event_type ?? '—'}</EnquiryCardDetail>
                </EnquiryCardPair>
                <EnquiryCardPair>
                  <EnquiryCardTerm>Event date</EnquiryCardTerm>
                  <EnquiryCardDetail>{formatDate(enquiry.event_date)}</EnquiryCardDetail>
                </EnquiryCardPair>
                <EnquiryCardPair>
                  <EnquiryCardTerm>Venue</EnquiryCardTerm>
                  <EnquiryCardDetail>{enquiry.venue ?? '—'}</EnquiryCardDetail>
                </EnquiryCardPair>
                <EnquiryCardPair>
                  <EnquiryCardTerm>Guest count</EnquiryCardTerm>
                  <EnquiryCardDetail>{enquiry.guest_count ?? '—'}</EnquiryCardDetail>
                </EnquiryCardPair>
                <EnquiryCardPair>
                  <EnquiryCardTerm>Setup required</EnquiryCardTerm>
                  <EnquiryCardDetail>{enquiry.setup_required ?? '—'}</EnquiryCardDetail>
                </EnquiryCardPair>
              </EnquiryCardGrid>

              {servicesList(enquiry) ? (
                <EnquiryCardServices>
                  {servicesList(enquiry).map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </EnquiryCardServices>
              ) : null}

              {enquiry.custom_inquiry ? (
                <EnquiryCardMessage>
                  <strong>Anything else we should know?</strong>
                  <p>{enquiry.custom_inquiry}</p>
                </EnquiryCardMessage>
              ) : null}

              <SelectField
                aria-label={`Status for ${enquiry.customer_name ?? 'enquiry'}`}
                value={enquiry.status ?? 'new'}
                onChange={(event) => handleStatusChange(enquiry.id, event.target.value)}
                options={statusOptions}
              />

              <EnquiryCardFooter>
                <span>{formatDateTime(enquiry.created_at)}</span>
                <EnquiryCardActions>
                  <Button type="button" variant="ghost" onClick={() => setSelected(enquiry)}>
                    <FiEye aria-hidden="true" size={15} />
                    View
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => setDeleteTarget(enquiry)}
                    title="Delete enquiry"
                  >
                    <FiTrash2 aria-hidden="true" size={15} />
                    Delete
                  </Button>
                </EnquiryCardActions>
              </EnquiryCardFooter>
            </EnquiryCard>
          ))
        )}
      </CardList>

      <Modal
        open={Boolean(selected)}
        title={selected?.customer_name ?? 'Enquiry'}
        description={selected ? `Received ${formatDateTime(selected.created_at)}` : undefined}
        onClose={() => setSelected(null)}
        footer={
          <>
            {selected?.email ? (
              <Button type="button" variant="outline" as="a" href={`mailto:${selected.email}`}>
                <FiMail aria-hidden="true" size={15} />
                Reply by email
              </Button>
            ) : null}
            <SelectField
              value={selected?.status ?? 'new'}
              onChange={(event) => handleStatusChange(selected.id, event.target.value)}
              options={ENQUIRY_STATUSES.map((status) => ({
                value: status,
                label: `Mark ${enquiryStatusLabels[status]}`,
              }))}
            />
          </>
        }
      >
        <DetailGrid>
          <DetailRow label="Email" value={selected?.email} />
          <DetailRow label="Phone" value={selected?.phone} />
          <DetailRow label="Event type" value={selected?.event_type} />
          <DetailRow label="Event date" value={formatDate(selected?.event_date)} />
          <DetailRow label="Venue" value={selected?.venue} />
          <DetailRow label="Guest count" value={selected?.guest_count} />
          <DetailRow label="Setup required" value={selected?.setup_required} />
          <DetailRow
            label="Services of interest"
            value={Array.isArray(selected?.selected_services) ? selected.selected_services.join(', ') : selected?.selected_services}
          />
          <DetailRow
            label="Anything else we should know?"
            value={selected?.custom_inquiry}
          />
          <DetailRow label="Status" value={<StatusBadge status={selected?.status ?? 'new'} />} />
        </DetailGrid>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete enquiry?"
        description="Are you sure you want to delete this enquiry? This action cannot be undone."
        confirmLabel="Delete Enquiry"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </EnquiriesPage>
  )
}

const CardSkeleton = () => (
  <EnquiryCard aria-hidden="true">
    <EnquiryCardSkeletonLine $width="55%" />
    <EnquiryCardSkeletonLine $width="90%" />
    <EnquiryCardSkeletonLine $width="75%" />
  </EnquiryCard>
)

const DetailRow = ({ label, value }) => (
  <>
    <DetailLabel>{label}</DetailLabel>
    <DetailValue>{value || '—'}</DetailValue>
  </>
)

export default Enquiries