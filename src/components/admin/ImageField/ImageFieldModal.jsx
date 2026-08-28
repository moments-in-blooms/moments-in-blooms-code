import { useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import Button from '../../Button/index.js'
import Modal from '../Modal/index.js'
import readImageFile from './readImageFile.js'
import { uploadDataUrl } from '../../../services/storage.js'
import {
  HiddenInput,
  ModalCurrentRow,
  ModalCurrentText,
  ModalCurrentThumb,
  ModalDropHint,
  ModalDropTitle,
  ModalDropzone,
  ModalError,
  ModalPreview,
  ModalPreviewWrap,
  ModalSelectedName,
  PickAnotherButton,
} from './ImageFieldModal.styles.js'

function ImageFieldModal({
  open,
  title,
  description,
  currentImage,
  maxSizeMb,
  onClose,
  onConfirm,
}) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(null)
  const [prevOpen, setPrevOpen] = useState(open)

  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setDragging(false)
      setBusy(false)
      setUploading(false)
      setError(null)
      setPending(null)
    }
  }

  const handleFile = async (file) => {
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      const dataUrl = await readImageFile(file, maxSizeMb)
      setPending({ dataUrl, name: file.name })
    } catch (readError) {
      setError(readError.message)
    } finally {
      setBusy(false)
    }
  }

  const handleConfirm = async () => {
    if (!pending) return
    setUploading(true)
    setError(null)
    try {
      const { data, error: uploadError } = await uploadDataUrl(pending.dataUrl, pending.name, {
        prefix: 'cms',
      })
      if (uploadError) {
        setError(uploadError.message)
        return
      }
      onConfirm(data.publicUrl)
    } catch (uploadError) {
      setError(uploadError.message || "We couldn't upload the image.")
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)
    handleFile(event.dataTransfer?.files?.[0])
  }

  const handleDragLeave = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setDragging(false)
    }
  }

  return (
    <Modal
      open={open}
      title={title}
      description={description}
      onClose={onClose}
      footer={
        <>
          <Button type="button" variant="outline" disabled={busy || uploading} onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={!pending || busy || uploading}
            onClick={handleConfirm}
          >
            {uploading ? 'Uploading…' : currentImage ? 'Replace image' : 'Add image'}
          </Button>
        </>
      }
    >
      {pending ? (
        <ModalPreviewWrap>
          <ModalPreview src={pending.dataUrl} alt="Selected image preview" />
          <ModalSelectedName>{pending.name}</ModalSelectedName>
          <PickAnotherButton type="button" onClick={() => setPending(null)}>
            Choose a different image
          </PickAnotherButton>
        </ModalPreviewWrap>
      ) : (
        <>
          {currentImage ? (
            <ModalCurrentRow>
              <ModalCurrentThumb src={currentImage} alt="Current image" />
              <ModalCurrentText>
                <strong>Current image</strong>
                <span>Choose a new image below to replace it.</span>
              </ModalCurrentText>
            </ModalCurrentRow>
          ) : null}

          <ModalDropzone
            type="button"
            $dragging={dragging}
            disabled={busy || uploading}
            onClick={() => inputRef.current?.click()}
            onDragEnter={(event) => {
              event.preventDefault()
              setDragging(true)
            }}
            onDragOver={(event) => {
              event.preventDefault()
              setDragging(true)
            }}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FiUpload aria-hidden="true" size={22} />
            <ModalDropTitle>
              {busy ? 'Processing image…' : 'Drag & drop your image here'}
            </ModalDropTitle>
            <ModalDropHint>
              {busy ? 'Hold on a moment' : 'or click to browse — JPG, PNG or WEBP'}
            </ModalDropHint>
          </ModalDropzone>

          <HiddenInput
            ref={inputRef}
            type="file"
            accept="image/*"
            tabIndex={-1}
            onChange={(event) => {
              handleFile(event.target.files?.[0])
              event.target.value = ''
            }}
          />
        </>
      )}

      {error ? <ModalError role="alert">{error}</ModalError> : null}
    </Modal>
  )
}

export default ImageFieldModal