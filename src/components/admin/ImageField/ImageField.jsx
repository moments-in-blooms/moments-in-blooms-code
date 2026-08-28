import { useState } from 'react'
import { FiEdit3, FiPlus, FiTrash2 } from 'react-icons/fi'
import { TextField } from '../../FormField/index.js'
import ImageFieldModal from './ImageFieldModal.jsx'
import {
  ActionBox,
  ActionIcon,
  ActionLabel,
  CaptionRow,
  CurrentImageLabel,
  FieldError,
  FieldShell,
  FieldTitle,
  RemoveButton,
  Thumb,
} from './ImageField.styles.js'

function ImageField({
  label,
  value,
  onChange,
  alt,
  onAltChange,
  error,
  maxSizeMb = 5,
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [thumbError, setThumbError] = useState(false)

  const hasImage = Boolean(value)

  const handleConfirm = (publicUrl) => {
    setThumbError(false)
    onChange?.(publicUrl)
    setModalOpen(false)
  }

  const handleRemove = () => {
    setThumbError(false)
    onChange?.('')
  }

  return (
    <FieldShell>
      {label ? <FieldTitle>{label}</FieldTitle> : null}

      <ActionBox
        type="button"
        aria-haspopup="dialog"
        onClick={() => setModalOpen(true)}
      >
        <ActionIcon>
          {hasImage ? <FiEdit3 aria-hidden="true" size={20} /> : <FiPlus aria-hidden="true" size={22} />}
        </ActionIcon>
        <ActionLabel>{hasImage ? 'Edit Image' : 'Add Image'}</ActionLabel>
      </ActionBox>

      {hasImage ? (
        <>
          <CaptionRow>
            <CurrentImageLabel>Current Image</CurrentImageLabel>
            <RemoveButton type="button" onClick={handleRemove}>
              <FiTrash2 aria-hidden="true" size={13} />
              Remove
            </RemoveButton>
          </CaptionRow>

          {!thumbError ? (
            <Thumb src={value} alt={alt ?? ''} onError={() => setThumbError(true)} />
          ) : null}
        </>
      ) : null}

      {error ? <FieldError role="alert">{error}</FieldError> : null}

      {onAltChange ? (
        <TextField
          label="Alt text"
          value={alt ?? ''}
          onChange={(event) => onAltChange(event.target.value)}
          hint="Describes the image for accessibility and SEO."
        />
      ) : null}

      <ImageFieldModal
        open={modalOpen}
        title={hasImage ? 'Edit image' : 'Add image'}
        description="Choose an image from your device or drag & drop one here."
        currentImage={hasImage ? value : ''}
        maxSizeMb={maxSizeMb}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </FieldShell>
  )
}

export default ImageField