import { useToast } from '../../hooks/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-card border rounded-lg shadow-lg p-4 max-w-sm"
        >
          {toast.title && (
            <div className="font-semibold">{toast.title}</div>
          )}
          {toast.description && (
            <div className="text-sm text-muted-foreground mt-1">
              {toast.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}