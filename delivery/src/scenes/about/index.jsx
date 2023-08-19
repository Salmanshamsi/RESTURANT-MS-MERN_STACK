import React from "react";
import Image from "../../assets/login-image.jpg";

const About = () => {
  return (
    <div id="about" >
      <div className="grid md:grid-cols-2 gap-8 px-8 md:px-12">
      <div  className="text-center md:text-left">
        <p className="mt-2 text-sm text-gray-500 md:text-base md:font-semibold font-serif">
          We are a family-owned restaurant that has been serving delicious meals
          for over 20 years. Our menu features a variety of dishes made with
          fresh, locally-sourced ingredients. From seafood to steak, vegetarian
          to gluten-free, we have something for everyone.
        </p>
        <p className="mt-2 text-sm text-gray-500 md:text-base md:font-semibold font-serif">
          At our restaurant, we believe that dining should be a complete
          experience. That's why we offer a warm and inviting atmosphere,
          attentive service, and a carefully curated wine list to pair with our
          dishes. Whether you're celebrating a special occasion or just looking
          for a great meal, we're here to make your experience unforgettable.
        </p>
        <p className="mt-2 text-sm text-gray-500 md:text-base md:font-semibold font-serif">
          We also believe in giving back to our community. That's why we source
          our ingredients from local farms and producers, support local
          charities, and participate in neighborhood events. We're proud to be a
          part of this community and to share our passion for food with our
          neighbors.
        </p>
      </div>
      <div className="flex justify-center">
        <img
          src={Image}
          alt="restaurant interior"
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
    </div>
  );
};

export default About;
