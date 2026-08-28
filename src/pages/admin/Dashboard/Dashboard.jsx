import { useEffect, useState } from 'react'
import { FiChevronRight, FiClock, FiInbox, FiRefreshCw } from 'react-icons/fi'
import AdminPageHeader from '../../../components/admin/AdminPageHeader/index.js'
import DataTable from '../../../components/admin/DataTable/index.js'
import EmptyState from '../../../components/admin/EmptyState/index.js'
import StatusBadge from '../../../components/admin/StatusBadge/index.js'
import Button from '../../../components/Button/index.js'
import { adminDashboard, adminPageMeta } from '../../../constants/admin.js'
import { adminNavigationGroups } from '../../../constants/navigation.js'
import { useContentOverview } from '../../../hooks/useContent.js'
import usePwaInstall from '../../../hooks/usePwaInstall.js'
import { isSupabaseConfigured } from '../../../services/supabaseClient.js'
import { listEnquiries } from '../../../services/enquiries.js'
import PwaInstallModal from '../../../components/admin/PwaInstallModal/index.js'
import {
  ContentIcon,
  ContentLabel,
  ContentLink,
  ContentRow,
  ContentStatus,
  DashboardPage,
  DemoNotice,
  PageGrid,
  PageSection,
  PageSectionHeader,
  PageSectionTitle,
  StatBlock,
  StatBlocks,
  StatLabel,
  StatSkeleton,
  StatValue,
} from './Dashboard.styles.js'

const formatSavedAt = (isoDate) => {
  try {
    return new Intl.DateTimeFormat('en-AU', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}

function Dashboard() {
  const overview = useContentOverview()
  const [enquiries, setEnquiries] = useState([])
  const [newThisWeek, setNewThisWeek] = useState(0)
  const [enquiriesLoading, setEnquiriesLoading] = useState(true)
  const [showPwaModal, setShowPwaModal] = useState(false)
  const { deferredPrompt, isStandalone, promptInstall } = usePwaInstall()

  useEffect(() => {
    const shouldShowAfterLogin = (() => {
      try {
        return window.sessionStorage.getItem('mib_pwa_show_after_login') === '1'
      } catch {
        return false
      }
    })()
    if (
      !isStandalone &&
      !window.localStorage.getItem('mib_pwa_modal_dismissed') &&
      shouldShowAfterLogin
    ) {
      try {
        window.sessionStorage.removeItem('mib_pwa_show_after_login')
        window.sessionStorage.setItem('mib_pwa_modal_shown_session', '1')
      } catch {
        void 0
      }
      const timer = window.setTimeout(() => setShowPwaModal(true), 600)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [isStandalone])

  useEffect(() => {
    let mounted = true
    listEnquiries(5).then((result) => {
      if (!mounted) return
      const list = result.data ?? []
      setEnquiries(list)
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
      setNewThisWeek(
        list.filter(
          (enquiry) =>
            enquiry.status === 'new' && new Date(enquiry.created_at).getTime() >= weekAgo,
        ).length,
      )
      setEnquiriesLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [])

  const pagesUpdated = overview.filter((page) => page.savedAt).length
  const contentPages = adminNavigationGroups.find((group) => group.id === 'content')?.items ?? []

  const statBlocks = [
    { label: adminDashboard.enquiriesTotalLabel, value: enquiries.length, icon: FiInbox },
    { label: adminDashboard.enquiriesWeekLabel, value: newThisWeek, icon: FiClock },
    { label: adminDashboard.pagesUpdatedLabel, value: `${pagesUpdated} / ${contentPages.length}`, icon: FiRefreshCw },
  ]

  return (
    <DashboardPage>
      <AdminPageHeader
        eyebrow={adminDashboard.welcomeEyebrow}
        title={adminDashboard.welcomeTitle}
        description={adminPageMeta.dashboard.description}
        actions={
          <Button to="/admin/enquiries" variant="primary">
            {adminDashboard.reviewEnquiriesLabel}
          </Button>
        }
      />

      {!isSupabaseConfigured() ? (
        <DemoNotice>
          <strong>{adminDashboard.demoNoticeTitle}</strong>
          {adminDashboard.demoNotice}
        </DemoNotice>
      ) : null}

      <StatBlocks>
        {statBlocks.map((block) => {
          const Icon = block.icon
          return (
            <StatBlock key={block.label}>
              <Icon aria-hidden="true" size={17} />
              <StatValue>{enquiriesLoading ? <StatSkeleton aria-label="Loading" /> : block.value}</StatValue>
              <StatLabel>{block.label}</StatLabel>
            </StatBlock>
          )
        })}
      </StatBlocks>

      <PageGrid>
        <PageSection>
          <PageSectionHeader>
            <PageSectionTitle>{adminDashboard.contentOverviewTitle}</PageSectionTitle>
          </PageSectionHeader>
          {contentPages.map((item) => {
            const overviewEntry = overview.find((entry) => entry.pageKey === item.path.replace('/admin/', ''))
            const status = overviewEntry?.dirty
              ? { label: 'Unsaved changes', tone: 'dirty' }
              : overviewEntry?.savedAt
                ? { label: `Saved ${formatSavedAt(overviewEntry.savedAt)}`, tone: 'saved' }
                : { label: adminDashboard.notSavedYetLabel, tone: 'idle' }
            return (
              <ContentLink key={item.path} to={item.path}>
                <ContentRow>
                  <ContentIcon aria-hidden="true" />
                  <ContentLabel>{item.label}</ContentLabel>
                  <ContentStatus $tone={status.tone}>{status.label}</ContentStatus>
                  <FiChevronRight aria-hidden="true" size={16} />
                </ContentRow>
              </ContentLink>
            )
          })}
        </PageSection>

        <PageSection>
          <PageSectionHeader>
            <PageSectionTitle>{adminDashboard.recentEnquiriesTitle}</PageSectionTitle>
          </PageSectionHeader>
          <DataTable
            loading={enquiriesLoading}
            caption={adminDashboard.recentEnquiriesTitle}
            columns={[
              {
                key: 'name',
                header: 'Name',
                render: (row) => <strong>{row.customer_name ?? '—'}</strong>,
              },
              { key: 'email', header: 'Email', render: (row) => row.email ?? '—' },
              { key: 'event', header: 'Event', render: (row) => row.event_type ?? '—' },
              {
                key: 'status',
                header: 'Status',
                render: (row) => <StatusBadge status={row.status ?? 'new'} />,
              },
            ]}
            rows={enquiries.slice(0, 5)}
            rowKey={(row) => row.id}
            emptyState={
              <EmptyState
                icon={<FiInbox aria-hidden="true" />}
                title={adminDashboard.noEnquiriesLabel}
                description={adminDashboard.noEnquiriesHint}
              />
            }
          />
          <Button to="/admin/enquiries" variant="ghost">
            {adminDashboard.viewAllLabel}
          </Button>
        </PageSection>
      </PageGrid>

      <PwaInstallModal
        open={showPwaModal}
        onClose={() => setShowPwaModal(false)}
        deferredPrompt={deferredPrompt}
        onInstall={promptInstall}
        isStandalone={isStandalone}
      />
    </DashboardPage>
  )
}

export default Dashboard