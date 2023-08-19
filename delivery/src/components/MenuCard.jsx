import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getApiMethod } from "../states/Api";

const MenuCard = ({ open, setOpen }) => {
  const [tableListData, setTableListData] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [products, setproducts] = useState([]);

  const getAllDishes = async () => {
    try {
      const getAllDishesData = await getApiMethod("dish/getDishes");
      if (getAllDishesData?.data.length > 0) {
        setTableListData(getAllDishesData?.data);
      }
    } catch (error) {
      alert(error?.message);
    }
  };
  const addItemToCart = async (dishData) => {
    setproducts((previousData) => {
      const dish = [...previousData, dishData];
      return dish;
    });
  };

  const deleteDish = (data) => {
    const filterDish = products?.filter((dish) => {
      return dish?._id != data?._id;
    });
    setproducts(filterDish);
  };

  useEffect(() => {
    getAllDishes();
  }, []);

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tableListData?.map((dishData, index) => {
            return (
              <div
                key={index}
                tabindex="0"
                class="focus:outline-none mx-2 w-72 xl:mb-0 mb-8 shadow-xl"
              >
                <div>
                  <img
                    alt="person capturing an image"
                    src={dishData?.image?.url}
                    tabindex="0"
                    class="focus:outline-none w-full h-44"
                  />
                </div>
                <div class="bg-white dark:bg-gray-800">
                  <div class="p-4">
                    <div class="flex items-center justify-between">
                      <h2
                        tabindex="0"
                        class="focus:outline-none text-lg dark:text-white font-semibold"
                      >
                        {dishData?.name}
                      </h2>
                      <p
                        tabindex="0"
                        class="focus:outline-none text-xs text-gray-600 dark:text-gray-200 pl-5"
                      >
                        Discount :{dishData?.discount}
                      </p>
                    </div>
                    <p
                      tabindex="0"
                      class="focus:outline-none text-xs text-gray-600 dark:text-gray-200 mt-2"
                    >
                      {dishData?.discription}
                    </p>
                    <div class="flex items-center justify-between py-4">
                      <h2
                        tabindex="0"
                        class="focus:outline-none text-indigo-700 text-lg font-semibold"
                      >
                        {dishData?.price}
                      </h2>
                      <Button
                        onClick={() => {
                          addItemToCart(dishData);
                        }}
                      >
                        🛒
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* Cart Menu STart */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {products?.map((product, index) => (
                                <li key={index} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product?.image?.url}
                                      alt={"dish-image"}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <div>{product?.name}</div>
                                        </h3>
                                        <p className="ml-4">{product?.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product?.discription}
                                      </p>
                                    </div>
                                    
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center justify-center gap-3">
                                        <button className=" rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                          +
                                        </button>
                                        <button className=" rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                          -
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() => {
                                            deleteDish(product);
                                          }}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>
                            {products?.reduce((accomudation, item, index) => {
                              return accomudation + item?.price;
                            }, 0)}
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6 flex items-center justify-center">
                          <button className=" rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Cart Menu Close */}
    </>
  );
};

export default MenuCard;
