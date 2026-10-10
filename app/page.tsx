import { Badge, Button, Card } from "@/src/design-system";

export default function Home() {
  return (
    <main className="min-h-screen bg-app px-6 py-12 text-app sm:px-10">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-3">
          <Badge tone="accent">StoreIt design system</Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your storage, in one place.</h1>
          <p className="max-w-2xl text-muted">A working canvas for the StoreIt interface. Edit the tokens and components in <code>src/design-system</code>.</p>
        </header>

        <section aria-labelledby="components-heading" className="space-y-4">
          <div>
            <h2 id="components-heading" className="text-xl font-semibold">Components</h2>
            <p className="mt-1 text-sm text-muted">Starter components, ready to reuse and customize.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">Your files are ready</h3>
                <Badge tone="success">Synced</Badge>
              </div>
              <p className="mt-2 text-sm text-muted">Your latest backup finished successfully.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button>Upload files</Button>
                <Button variant="secondary">View storage</Button>
              </div>
            </Card>
            <Card>
              <h3 className="font-semibold">Button variants</h3>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button variant="ghost">Quiet action</Button>
                <Button variant="danger">Delete</Button>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge>Default</Badge><Badge tone="warning">Needs attention</Badge>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
