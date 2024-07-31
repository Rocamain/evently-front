import React, { ReactNode } from 'react'
import Modal from '@/ui/Modal/Modal'
import AuthWrapper from '@/ui/auth/AuthWrapper'

export default function LayoutModal({ children }: { children: ReactNode }) {
  return (
    <Modal>
      <AuthWrapper>{children}</AuthWrapper>
    </Modal>
  )
}
