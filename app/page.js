import Model_page from "@/components/Model_s/model"
import Card_Section from "@/components/Card/Main_card_page"
import Footer from "@/components/footer"
import LoadingSpinner from "@/components/Loading"
import { Suspense } from "react"
/*
      <Suspense fallback={<LoadingSpinner/>}>
        <Model_page/>
      </Suspense>
*/
export default function Home() {

  return (
    <div >

      <div className="p-2">
        <Card_Section/>
      </div>
      <Footer/>
    </div>
  )
}
