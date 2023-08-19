import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";

const TestimonialsSlider = () => {
  const sliderOptions = {
    type: "loop",
    perPage: 1,
    perMove: 1,
    autoplay: true,
    pauseOnHover: false,
  };

  const testimonials = [
    {
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et commodo libero, vel ultrices nunc. Nullam laoreet orci vel porttitor commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc id interdum dolor, vitae iaculis nulla.",
    },
    {
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      text: "Praesent ut sodales risus. Duis et massa leo. Integer ut pulvinar arcu, id pharetra nibh. Sed aliquam dapibus leo, vel hendrerit purus luctus ac. Fusce auctor malesuada fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam faucibus vel velit sit amet scelerisque.",
    },
    {
      name: "Bob Johnson",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      text: "Morbi aliquet, risus eu luctus convallis, ipsum mauris laoreet lorem, vel fermentum velit nisi sed elit. Nunc ac feugiat mi. Nam efficitur varius elit, in imperdiet augue pulvinar in. Sed euismod tincidunt nisi, a hendrerit velit hendrerit vel.",
    },
  ];

  return (
    <div className="container mx-auto">
      <Splide options={sliderOptions}>
        {testimonials.map((testimonial) => (
          <SplideSlide key={testimonial.name}>
            <div className="max-w-md mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div className="text-lg font-semibold">{testimonial.name}</div>
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default TestimonialsSlider;
