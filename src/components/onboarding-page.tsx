'use client'

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function OnboardingPage() {
  const [selectedGoal, setSelectedGoal] = useState("vestibular");

  return (
    <div className="relative flex min-h-screen flex-col justify-between bg-background">
      <div className="flex h-full flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-card/80 p-4 backdrop-blur-sm">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="size-6" />
          </Button>
          <h1 className="flex-1 text-center text-lg font-bold text-card-foreground">Definir Metas</h1>
          <div className="size-10"></div>
        </header>

        <main className="flex-grow p-4">
          <div className="mb-8 flex w-full items-center gap-1.5">
            <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
            <div className="h-1.5 flex-1 rounded-full bg-secondary"></div>
            <div className="h-1.5 flex-1 rounded-full bg-secondary"></div>
            <div className="h-1.5 flex-1 rounded-full bg-secondary"></div>
            <div className="h-1.5 flex-1 rounded-full bg-secondary"></div>
            <div className="h-1.5 flex-1 rounded-full bg-secondary"></div>
          </div>
          <h2 className="mb-8 px-4 text-center text-3xl font-bold leading-tight text-foreground">
            Vamos criar um plano para alcançar seu objetivo. Qual é o seu foco?
          </h2>

          <RadioGroup 
            defaultValue="vestibular" 
            className="flex flex-col gap-4 p-4"
            onValueChange={setSelectedGoal}
            value={selectedGoal}
          >
            <Label className="flex items-center gap-4 rounded-2xl border-2 border-transparent bg-card p-4 shadow-sm transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/10">
              <span className="text-2xl">🎓</span>
              <span className="flex grow flex-col">
                <p className="text-base font-semibold leading-normal text-card-foreground">Vestibular</p>
              </span>
              <RadioGroupItem value="vestibular" id="vestibular" />
            </Label>
            <Label className="flex items-center gap-4 rounded-2xl border-2 border-transparent bg-card p-4 shadow-sm transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/10">
              <span className="text-2xl">🏛️</span>
              <span className="flex grow flex-col">
                <p className="text-base font-semibold leading-normal text-card-foreground">Concurso Público</p>
              </span>
              <RadioGroupItem value="concurso" id="concurso" />
            </Label>
            <Label className="flex items-center gap-4 rounded-2xl border-2 border-transparent bg-card p-4 shadow-sm transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/10">
              <span className="text-2xl">✍️</span>
              <span className="flex grow flex-col">
                <p className="text-base font-semibold leading-normal text-card-foreground">Outro</p>
              </span>
              <RadioGroupItem value="outro" id="outro" />
            </Label>
          </RadioGroup>
          
          {selectedGoal === 'outro' && (
            <div className="px-4 py-3">
              <Input className="h-14 rounded-xl p-4 text-base" placeholder="Digite seu objetivo" />
            </div>
          )}
        </main>
      </div>
      <footer className="sticky bottom-0 border-t bg-card/80 p-4 backdrop-blur-sm">
        <Button asChild size="lg" className="h-12 w-full text-base font-bold">
            <Link href="/home">Avançar</Link>
        </Button>
      </footer>
    </div>
  )
}
