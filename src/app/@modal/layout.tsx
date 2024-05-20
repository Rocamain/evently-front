import React, { ReactNode } from 'react'
import Modal from '@/ui/Modal/Modal'

export default function LayoutModal({ children }: { children: ReactNode }) {
  return <Modal>{children}</Modal>
}
