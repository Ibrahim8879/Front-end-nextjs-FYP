import Model_page from "@/components/Model_s/model"
import Card_Section from "@/components/Card/Main_card_page"
import BarLineGraph from "@/components/Graph/BarGraph"
import Footer from "@/components/footer"

export default function Home() {

  return (
    <div>
      <Model_page/>
      <Card_Section/>
      <BarLineGraph/>
      <Footer/>
    </div>
  )
}
