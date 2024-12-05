import { Button } from "@/components/ui/button"
import { ArrowRight, Recycle } from 'lucide-react'

export default function CallToAction() {
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto text-center">
        <Recycle className="mx-auto h-16 w-16 mb-6" />
        <h2 className="text-3xl font-bold mb-4">Join the Recycling Revolution</h2>
        <p className="text-xl mb-8">List your recycled items and make a positive impact on the environment</p>
        <Button size="lg" variant="secondary">
          Start Selling <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

