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
        
       <div id='infoBox1'><InfoBox1/></div> 
      
        <InfoBox2/>
       
        <InfoBox3/>
       
        <div id='infoBox4'> <InfoBox4/></div>
        </>
    )
}