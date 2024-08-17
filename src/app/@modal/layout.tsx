import React, { ReactNode } from 'react'
import Modal from '@/ui/Modal/Modal'
import AuthWrapper from '@/ui/auth/AuthWrapper'

export default function LayoutModal({
  children,
  params,
}: {
  children: ReactNode
  params: { eventId?: string }
}) {
  return (
    <Modal>
      <AuthWrapper>{children}</AuthWrapper>
    </Modal>
  )
}
