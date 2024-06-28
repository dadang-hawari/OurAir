const baseOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
}

const baseContent = {
  backgroundColor: 'rgba(0, 0, 0, 0)',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

export const customStyles = {
  overlay: baseOverlay,
  content: baseContent,
}

export const customStylesDestination = {
  overlay: {
    ...baseOverlay,
    overflow: 'hidden',
  },
  content: {
    ...baseContent,
    overflow: 'auto',
    width: '90%',
    maxWidth: '700px',
  },
}

export const customStylesFilter = {
  overlay: baseOverlay,
  content: {
    ...baseContent,
    width: '90%',
    maxWidth: '800px',
  },
}
