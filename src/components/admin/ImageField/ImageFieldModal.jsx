import { useRef, useState } from 'react'
import { FiTrash2, FiUpload } from 'react-icons/fi'
import Button from '../../Button/index.js'
import Modal from '../Modal/index.js'
import readImageFile from './readImageFile.js'
import { deleteImage, listImages, uploadDataUrl } from '../../../services/storage.js'
import {
  HiddenInput,
  LibraryDeleteButton,
  LibraryEmpty,
  LibraryGrid,
  LibraryItem,
  LibraryThumbButton,
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
  ModalTab,
  ModalTabs,
  PickAnotherButton,
} from './ImageFieldModal.styles.js'

const BROWSE_DESCRIPTION = 'Reuse a previously uploaded image, or delete ones you no longer need.'

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
  const [tab, setTab] = useState('upload')
  const [library, setLibrary] = useState(null)
  const [libraryLoading, setLibraryLoading] = useState(false)
  const [libraryError, setLibraryError] = useState(null)
  const [libraryDemo, setLibraryDemo] = useState(false)
  const [confirmDeletePath, setConfirmDeletePath] = useState(null)
  const [deletingPath, setDeletingPath] = useState(null)
  const [prevOpen, setPrevOpen] = useState(open)

  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setDragging(false)
      setBusy(false)
      setUploading(false)
      setError(null)
      setPending(null)
      setTab('upload')
      setLibrary(null)
      setLibraryLoading(false)
      setLibraryError(null)
      setLibraryDemo(false)
      setConfirmDeletePath(null)
      setDeletingPath(null)
    }
  }

  // The library loads on demand from the tab click (never in an effect), so
  // uploads stay the default path and demo mode never hits the network.
  // The modal stays mounted while hidden, so no cancellation is needed.
  const loadLibrary = () => {
    if (libraryLoading) return
    setLibraryLoading(true)
    setLibraryError(null)
    listImages()
      .then((result) => {
        if (result.error) {
          setLibraryError(result.error.message)
          return
        }
        setLibrary(result.data ?? [])
        setLibraryDemo(Boolean(result.demo))
      })
      .catch(() => setLibraryError("We couldn't load the media library. Please try again."))
      .finally(() => setLibraryLoading(false))
  }

  const handleBrowseTab = () => {
    setTab('browse')
    if (library === null) loadLibrary()
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

  const handleSelectLibraryItem = (item) => {
    if (!item?.publicUrl || deletingPath) return
    onConfirm(item.publicUrl)
  }

  const handleDeleteLibraryItem = async (item) => {
    if (!item?.path || deletingPath) return
    if (confirmDeletePath !== item.path) {
      setConfirmDeletePath(item.path)
      return
    }
    setConfirmDeletePath(null)
    setDeletingPath(item.path)
    setError(null)
    const { error: deleteError } = await deleteImage(item.path)
    setDeletingPath(null)
    if (deleteError) {
      setError(deleteError.message)
      return
    }
    setLibrary((current) => (current ?? []).filter((entry) => entry.path !== item.path))
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

  const renderUploadPane = () => {
    if (pending) {
      return (
        <ModalPreviewWrap>
          <ModalPreview src={pending.dataUrl} alt="Selected image preview" />
          <ModalSelectedName>{pending.name}</ModalSelectedName>
          <PickAnotherButton type="button" onClick={() => setPending(null)}>
            Choose a different image
          </PickAnotherButton>
        </ModalPreviewWrap>
      )
    }
    return (
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
    )
  }

  const renderBrowsePane = () => {
    if (libraryLoading) {
      return <LibraryEmpty>Loading your uploaded images…</LibraryEmpty>
    }
    if (libraryError) {
      return (
        <>
          <ModalError role="alert">{libraryError}</ModalError>
          <PickAnotherButton type="button" onClick={loadLibrary}>
            Try again
          </PickAnotherButton>
        </>
      )
    }
    if (libraryDemo) {
      return (
        <LibraryEmpty>
          The media library needs Supabase to be configured. Uploads still work — they are
          kept in this browser only.
        </LibraryEmpty>
      )
    }
    if (!library || library.length === 0) {
      return <LibraryEmpty>No uploaded images yet. Switch to “Upload new” to add one.</LibraryEmpty>
    }
    return (
      <LibraryGrid>
        {library.map((item) => {
          const isCurrent = Boolean(currentImage) && item.publicUrl === currentImage
          const isConfirming = confirmDeletePath === item.path
          const isDeleting = deletingPath === item.path
          return (
            <LibraryItem key={item.path}>
              <LibraryThumbButton
                type="button"
                onClick={() => handleSelectLibraryItem(item)}
                title={isCurrent ? 'Currently in use — select to keep it' : `Use ${item.name}`}
                aria-label={isCurrent ? `Currently in use: ${item.name}` : `Use image ${item.name}`}
              >
                <img src={item.publicUrl} alt="" loading="lazy" />
              </LibraryThumbButton>
              {isCurrent ? null : (
                <LibraryDeleteButton
                  type="button"
                  disabled={isDeleting}
                  onClick={() => handleDeleteLibraryItem(item)}
                  title={isConfirming ? 'Click again to confirm deletion' : `Delete ${item.name}`}
                >
                  <FiTrash2 aria-hidden="true" size={12} />
                  {isDeleting ? 'Deleting…' : isConfirming ? 'Confirm?' : 'Delete'}
                </LibraryDeleteButton>
              )}
            </LibraryItem>
          )
        })}
      </LibraryGrid>
    )
  }

  return (
    <Modal
      open={open}
      title={title}
      description={tab === 'browse' ? BROWSE_DESCRIPTION : description}
      onClose={onClose}
      footer={
        tab === 'browse' ? (
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        ) : (
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
        )
      }
    >
      <ModalTabs role="tablist" aria-label="Image source">
        <ModalTab
          type="button"
          role="tab"
          aria-selected={tab === 'upload'}
          $active={tab === 'upload'}
          onClick={() => setTab('upload')}
        >
          Upload new
        </ModalTab>
        <ModalTab
          type="button"
          role="tab"
          aria-selected={tab === 'browse'}
          $active={tab === 'browse'}
          onClick={handleBrowseTab}
        >
          Browse library
        </ModalTab>
      </ModalTabs>

      {tab === 'browse' ? renderBrowsePane() : renderUploadPane()}

      {error ? <ModalError role="alert">{error}</ModalError> : null}
    </Modal>
  )
}

export default ImageFieldModal
