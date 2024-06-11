import Video_cover from "@/components/video"
import Card_Section from "@/components/Card/Main_card_page"
import Footer from "@/components/footer"

export default function Home() {

  return (
    <div >
      <Video_cover/>
      <div className="p-2">
        <Card_Section/>
      </div>
      <Footer/>
    </div>
  )
}
