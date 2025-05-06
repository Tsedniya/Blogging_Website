import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
const HomePage =() =>{
    return (
        <AnimationWrapper>
            <section className = "h-cover flex justify-center gap-10">
                {/*latest*/}
                <div className="w-full">
                    <InPageNavigation routes={["Home","Trending blogs"]} defaultHidden={["Trending blogs"]}></InPageNavigation>
                </div>
                 {/*trending*/}
                 <div className="">
                    
                </div>
                
            </section>        
            </AnimationWrapper>
        
    )
}
export default HomePage;