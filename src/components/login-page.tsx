'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between p-4">
        <div></div>
        <Button variant="ghost" size="icon" className="text-gray-800 hover:bg-gray-100">
          <HelpCircle className="size-6" />
        </Button>
      </header>
      <main className="flex flex-1 flex-col px-6 py-8">
        <div className="flex-grow">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo de volta!</h1>
            <p className="mt-2 text-gray-500">Faça login para continuar sua jornada de estudos.</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
              <div className="mt-1">
                <Input type="email" name="email" id="email" className="h-14 rounded-xl border-gray-300 bg-gray-50 p-4 text-base placeholder:text-gray-400" placeholder="seuemail@email.com" autoComplete="email" />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <div className="mt-1">
                <Input type="password" name="password" id="password" className="h-14 rounded-xl border-gray-300 bg-gray-50 p-4 text-base placeholder:text-gray-400" placeholder="Sua senha" autoComplete="current-password" />
              </div>
              <div className="mt-2 flex items-center justify-end text-sm">
                <Link className="font-medium text-primary hover:text-primary/90" href="#">
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
            <Button asChild type="submit" size="lg" className="h-auto w-full rounded-full py-3.5 text-lg font-bold">
              <Link href="/onboarding">Continuar</Link>
            </Button>
          </form>
          <div className="relative my-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Ou continue com</span>
            </div>
          </div>
          <div className="space-y-4">
            <Button variant="outline" className="h-14 w-full justify-center rounded-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy2aLD7MVco4pRVHuW1NMEWXiKDav3iZeN3I25oRoHT7ONO1VqJgz-e-ZiraM_iJr8dLiHgGMpnT1gnKL7CB-aHvLJym7uR2DHoOROtAoSO2NGLdpTZHvtG5PSGODiwi9IHDml_YCxBGS_Xd2E0CSO_jBrfGAVs3RozeeqKnigjRzNLn1RHfunz7eTEcJWxknH9oTj-ZyNfQTmGK1rzQc47reUUGY_X4v9d5TgvfyqGE5AoxEi_bwX-eMxK-JiDSg1OQi7ET-Avkg" alt="Google logo" width={24} height={24} className="mr-3"/>
                <span className="font-medium">Entrar com Google</span>
            </Button>
            <Button className="h-14 w-full justify-center rounded-full bg-[#1877F2] hover:bg-[#166fe5]">
                <svg className="mr-3 size-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path></svg>
                <span className="font-medium">Entrar com Facebook</span>
            </Button>
             <Button className="h-14 w-full justify-center rounded-full bg-black text-white hover:bg-gray-800">
                <svg className="mr-3 size-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.012 15.344c-2.072 0-3.328-1.255-4.104-2.511-1.258-2.016-.83-5.115 1.088-6.845.893-.812 2.083-1.272 3.237-1.272 1.026 0 2.158.375 3.118 1.157l-1.637 1.835c-.6-.53-1.322-.86-2.148-.86-.884 0-1.83.47-2.5,1.24-.954 1.085-.92 2.89.096 3.916.63.633 1.45.96 2.378.96.84 0 1.57-.31 2.22-.89l1.636 1.835c-.94.885-2.22 1.43-3.484 1.43zm.032-15.344c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.267 4.265c.96-.032 1.57.575 1.57.575s-.576 1.29-1.55 1.29c-.975 0-1.57-.575-1.57-.575s.575-1.29 1.55-1.29z"></path></svg>
                <span className="font-medium">Entrar com Apple</span>
            </Button>
          </div>
        </div>
      </main>
      <footer className="px-6 pb-8 pt-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Não tem uma conta? <Link className="font-medium text-primary hover:text-primary/90" href="#">Cadastre-se</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
