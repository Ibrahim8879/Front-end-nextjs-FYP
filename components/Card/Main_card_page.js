import Mui_Card from "./Single_card";

const Card_Section = () => {
  return (
    <div className="min-h-128">
        <h1 className="text-4xl text-white mt-16 mb-32 ml-20 underline underline-offset-8">What We Offer</h1>
        <div className="flex flex-col justify-center items-center gap-24 sm:flex-row">
            <Mui_Card 
            imageUrl={"/card_pictures/1.jpg"}
            title={"Sample Title"}
            description={"An immersive depiction of data analytics in action, showcasing a dynamic visual representation of interconnected data points, charts, and graphs."}
            />
            <Mui_Card 
            imageUrl={"/card_pictures/2.jpg"}
            title={"Sample Title"}
            description={"An immersive depiction of data analytics in action, showcasing a dynamic visual representation of interconnected data points, charts, and graphs."}
            />
            <Mui_Card 
            imageUrl={"/card_pictures/3.jpg"}
            title={"Sample Title"}
            description={"An immersive depiction of data analytics in action, showcasing a dynamic visual representation of interconnected data points, charts, and graphs."}
            />
            <Mui_Card 
            imageUrl={"/card_pictures/4.jpg"}
            title={"Sample Title"}
            description={"An immersive depiction of data analytics in action, showcasing a dynamic visual representation of interconnected data points, charts, and graphs."}
            />
        </div>
    </div>
  );
};

export default Card_Section;
