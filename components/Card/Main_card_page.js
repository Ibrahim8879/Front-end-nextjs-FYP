import Mui_Card from "./Single_card";

/*
<Mui_Card 
            imageUrl={"/card_pictures/3.png"}
            title={"Dataset Insights"}
            description={"Explore user locations, trend regions, tweet languages, and hashtag-based histograms to uncover trends and patterns in the dataset."}
            linkref='dataset'
            />
*/
const Card_Section = () => {
  return (
    <div className="min-h-128">
        <h1 className="text-4xl text-white mt-16 mb-32 ml-20 underline underline-offset-8">What We Offer</h1>
        <div className="flex flex-wrap justify-center items-center sm:flex-nowrap sm:flex-row">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-4 gap-24">
            <Mui_Card 
            imageUrl={"/card_pictures/4.PNG"}
            title={"Trending Topics Analysis"}
            description={"Explore trending topics across languages, trend regions, and user locations to uncover global and local trends."}
            linkref='trendingtopics'
            />
            <Mui_Card 
            imageUrl={"/card_pictures/5.PNG"}
            title={"Word Usage Frequency"}
            description={"Analyze the frequency of words used across different locations and trends to understand regional language variations."}
            linkref='wordusage'
            />
            <Mui_Card 
            imageUrl={"/card_pictures/6.PNG"}
            title={"Abusive Words Count"}
            description={"Utilize language-specific libraries to count abusive words, providing insights into the prevalence of abusive language across different languages."}
            linkref='abusivewords'
            />
            <Mui_Card 
            imageUrl={"/card_pictures/8.PNG"}
            title={"Sentimental Analysis"}
            description={"Perform sentiment analysis to categorize tweets into positive, negative, and neutral categories, enabling a deeper understanding of user sentiments across languages."}
            linkref='sentimental'
            />
            <Mui_Card 
            imageUrl={"/card_pictures/7.PNG"}
            title={"Influence Analysis"}
            description={"Explore the influence of users based on follower counts and retweets, highlighting influential users across different languages and trends."}
            linkref='influence'
            />
            <Mui_Card 
            imageUrl={"/card_pictures/9.PNG"}
            title={"Lexical Analysis"}
            description={"Analyze tweet lengths for each language, revealing insights into language-specific communication styles and trends."}
            linkref='lexical'
            />
          </div>
        </div>
    </div>
  );
};

export default Card_Section;
