import { Carousel, Card } from "@/components/ui/cards-carousel";

export function CardCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans text-center">
        Get familiar with <b>Urja Setu</b> in 6 Steps
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = ({ src }: { src: string }) => {
  console.log(src);
  return (
    <>
      <div className=" dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 h-12">
        <img
          src={src}
          alt="Content Image"
          height={500}
          width={500}
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
        />
      </div>
    </>
  );
};

const data = [
  {
    category: "Step 1",
    title: "Upload Image of waste generated.",
    src: "/sell-garbage.jpg",
    content: <DummyContent src="/images/wasteImageUpload.webp" />,
  },
  {
    category: "Step 2",
    title: "Get Urja Coins After Waste Pick",
    src: "/reward-coins.jpg",
    content: <DummyContent src="/reward-landscape.jpg" />,
  },
  {
    category: "Step 3",
    title: "Waste driven to Recycling Plant",
    src: "/waste-to-energy.jpg",
    content: <DummyContent src="/recycle.jpg" />,
  },

  {
    category: "Step 4",
    title: "Waste gets recycled",
    src: "/platform.jpg",
    content: <DummyContent src="/platform.jpg" />,
  },
  {
    category: "Step 5",
    title: "Recycled Products leave for supermarket",
    src: "/reduce.jpg",
    content: <DummyContent src="/reduce.jpg" />,
  },
  {
    category: "Step 6",
    title: "Redeem Urja Coins and Buy Recycled Products",
    src: "/direct.jpg",
    content: <DummyContent src="/direct.jpg" />,
  },
];
