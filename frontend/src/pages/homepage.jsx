import Title from "../components/home/title"
import LetsGetStarted from "../components/home/search"
import InfoBox1 from "../components/home/firstInfo"
import InfoBox2 from "../components/home/secondInfo"
import InfoBox3 from "../components/home/thirdInfo"
import InfoBox4 from "../components/home/fourthinfo"

export default function HomePage() {
    return(
        <>
        <div style={{height:'85vh'}}>
        <Title/>
        <LetsGetStarted/>
        </div>
        
        <InfoBox1/>
      
        <InfoBox2/>
       
        <InfoBox3/>
       
        <InfoBox4/>
        </>
    )
}