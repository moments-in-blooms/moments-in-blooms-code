import { useState } from 'react'
import { FiCheckCircle, FiDownload, FiSmartphone, FiTablet, FiX } from 'react-icons/fi'
import Button from '../../Button/index.js'
import Modal from '../Modal/index.js'
import {
  AppIcon,
  ChoiceButton,
  ChoiceGrid,
  ModalHeader,
  ModalTitle,
  StepItem,
  StepList,
  StepNumber,
  StepText,
} from './PwaInstallModal.styles.js'

function AndroidTutorial({ deferredPrompt, onInstall }) {
  const canInstall = Boolean(deferredPrompt)
  return (
    <>
      <StepList>
        <StepItem>
          <StepNumber>01</StepNumber>
          <StepText>
            Tap <strong>⋮</strong> (Chrome menu, top-right) → <strong>Install app</strong>
            {canInstall ? ' or tap the button below' : ''}
          </StepText>
          <FiCheckCircle aria-hidden="true" size={16} />
        </StepItem>
        <StepItem>
          <StepNumber>02</StepNumber>
          <StepText>
            Tap <strong>Install</strong> in the prompt → <strong>Open</strong>
          </StepText>
          <FiCheckCircle aria-hidden="true" size={16} />
        </StepItem>
        <StepItem>
          <StepNumber>03</StepNumber>
          <StepText>App appears on your home screen — launch like any app</StepText>
          <FiCheckCircle aria-hidden="true" size={16} />
        </StepItem>
      </StepList>
      <Button
        type="button"
        variant="primary"
        fullWidth
        disabled={!canInstall}
        onClick={onInstall}
        title={canInstall ? 'Install app' : 'Install prompt not ready — use Chrome menu → Install app'}
      >
        <FiDownload aria-hidden="true" size={16} />
        {canInstall ? 'Install now' : 'Install via Chrome menu'}
      </Button>
      {!canInstall ? (
        <p style={{ fontSize: '0.74rem', color: '#6E6761', lineHeight: 1.6, margin: 0, textAlign: 'center' }}>
          If the button is disabled, open Chrome menu (⋮) → <strong>Install app</strong> or <strong>Add to Home screen</strong>
        </p>
      ) : null}
    </>
  )
}

function IphoneTutorial() {
  return (
    <StepList>
      <StepItem>
        <StepNumber>01</StepNumber>
        <StepText>
          Tap <strong>Share</strong> ⬆️ (Safari toolbar, bottom center)
        </StepText>
        <FiCheckCircle aria-hidden="true" size={16} />
      </StepItem>
      <StepItem>
        <StepNumber>02</StepNumber>
        <StepText>
          Scroll down → Tap <strong>Add to Home Screen</strong>
        </StepText>
        <FiCheckCircle aria-hidden="true" size={16} />
      </StepItem>
      <StepItem>
        <StepNumber>03</StepNumber>
        <StepText>
          Tap <strong>Add</strong> (top-right) → <strong>Open</strong> from home screen
        </StepText>
        <FiCheckCircle aria-hidden="true" size={16} />
      </StepItem>
    </StepList>
  )
}

function PwaInstallModal({ open, onClose, deferredPrompt, onInstall, isStandalone }) {
  const [selected, setSelected] = useState('android')
  const [dontShow, setDontShow] = useState(false)

  if (isStandalone) return null

  const handleClose = () => {
    if (dontShow) {
      try {
        window.localStorage.setItem('mib_pwa_modal_dismissed', '1')
      } catch {
        // storage unavailable
      }
    }
    onClose?.()
  }

  return (
    <Modal
      open={open}
      title="Install Moments in Blooms"
      description="Add to your home screen for instant, offline access — auto-updates in background."
      onClose={handleClose}
      footer={
        <>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#6E6761', cursor: 'pointer' }}>
            <input type="checkbox" checked={dontShow} onChange={(e) => setDontShow(e.target.checked)} />
            Don&apos;t show again
          </label>
          <Button type="button" variant="outline" onClick={handleClose}>
            <FiX aria-hidden="true" size={15} />
            Close
          </Button>
        </>
      }
    >
      <div style={{ display: 'grid', placeItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <AppIcon src="/pwa-512x512.png" alt="Moments in Blooms app icon" width={72} height={72} />
        <span style={{ fontSize: '0.72rem', color: '#6E6761', fontFamily: 'Montserrat, sans-serif' }}>White background • Offline ready • Auto-update</span>
      </div>
      <ModalHeader>
        <FiSmartphone aria-hidden="true" size={18} />
        <ModalTitle>Choose your device</ModalTitle>
      </ModalHeader>

      <ChoiceGrid role="group" aria-label="Device choice">
        <ChoiceButton
          type="button"
          $selected={selected === 'android'}
          onClick={() => setSelected('android')}
          aria-pressed={selected === 'android'}
        >
          <FiSmartphone aria-hidden="true" size={18} />
          Android
        </ChoiceButton>
        <ChoiceButton
          type="button"
          $selected={selected === 'iphone'}
          onClick={() => setSelected('iphone')}
          aria-pressed={selected === 'iphone'}
        >
          <FiTablet aria-hidden="true" size={18} />
          iPhone
        </ChoiceButton>
      </ChoiceGrid>

      {selected === 'android' ? (
        <AndroidTutorial deferredPrompt={deferredPrompt} onInstall={onInstall} />
      ) : (
        <IphoneTutorial />
      )}
    </Modal>
  )
}

export default PwaInstallModal
