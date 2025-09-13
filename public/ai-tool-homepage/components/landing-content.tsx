import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, Palette, Download } from "lucide-react"

export function LandingContent() {
  return (
    <div className="space-y-24">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold tracking-tight mb-6">What is seedream?</h2>
        <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
          seedream is where imagination meets artificial intelligence. Our platform nurtures the seeds of your
          creativity, transforming abstract thoughts and wild dreams into stunning visual masterpieces. Whether you're
          an artist, storyteller, or dreamer, seedream helps you visualize the impossible and bring your inner visions
          to life.
        </p>
      </div>

      {/* Why Choose Us */}
      <div>
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center tracking-tight mb-12">Why Choose seedream?</h2>
        <div className="space-y-6 max-w-5xl mx-auto">
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-5">
              <div className="shrink-0 rounded-2xl bg-primary/10 text-primary p-4">
                <Zap className="h-10 w-10" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Instant Dreams</CardTitle>
                <CardContent className="px-0">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Watch your dreams materialize in seconds with our lightning-fast AI dream engine.
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-5">
              <div className="shrink-0 rounded-2xl bg-primary/10 text-primary p-4">
                <Palette className="h-10 w-10" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Limitless Styles</CardTitle>
                <CardContent className="px-0">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    From ethereal dreamscapes to surreal fantasies, explore infinite artistic possibilities.
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-5">
              <div className="shrink-0 rounded-2xl bg-primary/10 text-primary p-4">
                <Shield className="h-10 w-10" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Your Dreams, Your Rights</CardTitle>
                <CardContent className="px-0">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Every dream you create belongs to you with full commercial usage rights.
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-5">
              <div className="shrink-0 rounded-2xl bg-primary/10 text-primary p-4">
                <Download className="h-10 w-10" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Crystal Clear Visions</CardTitle>
                <CardContent className="px-0">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Download your dreams in stunning 4K resolution for any creative project.
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* How to Use It */}
      <div>
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center tracking-tight mb-12">How to Plant Your Dreams?</h2>
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-md">1</div>
              <div className="w-px flex-1 bg-border mt-2"></div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Plant Your Seed</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Describe your wildest dreams and impossible visions. Let your imagination flow freely.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-md">2</div>
              <div className="w-px flex-1 bg-border mt-2"></div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Choose Your Reality</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Select from dreamlike, surreal, or fantastical styles to shape your vision.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-md">3</div>
              {/* No line for the last step */}
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Watch It Bloom</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                See your dream come to life in stunning detail, then harvest it in high resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
