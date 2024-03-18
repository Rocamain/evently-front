import React, { ReactNode } from 'react'
import Modal from '@/components/Modal/Modal'

export default function LayoutModal({ children }: { children: ReactNode }) {
  return <Modal>{children}</Modal>
}
