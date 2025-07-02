import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import useEmblaCarousel from "embla-carousel-react";
import { IoIosArrowForward } from "react-icons/io";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) return;

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateScrollButtons);
    updateScrollButtons();
  }, [emblaApi, updateScrollButtons]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.PRODUCT.GET_NEW_ARRIVALS);
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto px-8 md:px-10 py-10 relative">
        <div className="w-full lg:w-[60vw] mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
          <p className="text-lg text-gray-600 mb-8">
            Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge
            of fashion
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex pt-14 pb-8">
              {newArrivals.map((product) => (
                <div key={product._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
                  <img
                    src={product.images[0]?.url}
                    alt={product.images[0]?.altText || product.name}
                    className="w-full h-[500px] object-contain rounded-lg"
                    draggable="false"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-opacity-80 backdrop-blur-md text-black p-4 rounded-b-lg">
                    <Link to={`/product/${product._id}`} className="block">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="mt-1">${product.price}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation buttons */}

          <button
            className={`absolute top-1/2 transform -translate-y-1/2 -left-5 shadow p-2 rounded border bg-white text-gray-400 `}
            onClick={() => emblaApi && emblaApi.scrollPrev()}
            disabled={!canScrollPrev}
          >
            <IoIosArrowForward className="rotate-180" />
          </button>

          <button
            className={`absolute top-1/2 transform -translate-y-1/2 -right-5 shadow p-2 rounded border bg-white text-gray-400`}
            onClick={() => emblaApi && emblaApi.scrollNext()}
            disabled={!canScrollNext}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
