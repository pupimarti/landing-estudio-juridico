'use client'

import { useToast } from '@/hooks/use-toast'
import { AlertTriangle, CircleCheckBig } from 'lucide-react'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const isDestructive = variant === 'destructive'
        const StatusIcon = isDestructive ? AlertTriangle : CircleCheckBig

        return (
          <Toast key={id} variant={variant} {...props}>
            <div
              className={
                isDestructive
                  ? 'mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-destructive/20 bg-destructive/10 text-destructive'
                  : 'mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/15 text-primary'
              }
            >
              <StatusIcon className="h-5 w-5" />
            </div>

            <div className="grid flex-1 gap-1.5 pr-2">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
