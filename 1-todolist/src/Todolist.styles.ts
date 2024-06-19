import { SxProps } from '@mui/material'
 
export const filterButtonsContainerSx: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
}

export const getListItemSx = (status: string): SxProps => ({
    p: 0,
    justifyContent: 'space-between',
    opacity: status === 'is-done' ? 0.5 : 1,
  })