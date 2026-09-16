
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserAlt } from "react-icons/fa";
import Swal from "sweetalert2";
const Home = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loadingData, setLoadingData] = useState(true)
    const [showProfile, setShowProfile] = useState(false)
    const profileRef = useRef(null);
    const getProducts = async () => {
        try {
            setLoadingData(true);
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/products",
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            if (response.data.success) {
                setProducts(response.data.products);
                setLoadingData(false);
                console.log("response.data.products", response.data.products)
            }

        } catch (error) {

            console.log(error.response?.data);
            setLoadingData(false);
            toast.error(
                error.response?.data?.message ||
                "Unable to fetch products"
            );
        }
    };

  const deleteProduct = async (id) => {
     Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async(result)=>{
    try {
           if (result.isConfirmed) {
        const token = localStorage.getItem("token");

        const response = await axios.delete(
            `http://localhost:5000/products/${id}`,
            {
                headers: {
                    Authorization: token,
                },
            }
        );

        if (response.data.success) {
            toast.success(response.data.message);

            setProducts(
                products.filter((product) => product._id !== id)
            );
        }
    }} catch (error) {
        console.log(error.response?.data);

        toast.error(
            error.response?.data?.message || "Something went wrong"
        );
    }
  })
};

    const loggedInUser = localStorage.getItem("loggedInUser");
    useEffect(() => {
        getProducts();
    }, []);



    useEffect(() => {

        const handleClickOutside = (event) => {
            console.log("event", event)
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfile(false);
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);
    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");

        navigate("/login");
    };


    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">

            {/* Header */}

            <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">

                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    <div>
                        <h1 className="text-[16px] md:text-xl font-bold text-gray-900 dark:text-white">
                            Product Manager
                        </h1>

                        <p className="text-[12px] md:text-sm text-gray-500 dark:text-gray-400">
                            Manage your products
                        </p>

                    </div>


                    {/* <div className="flex items-center gap-4">

            <div className="flex flex-col items-center gap-3 relative">
 <button
        onClick={() => setShowProfile(!showProfile)}
        className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200"
    >
     <FaUserAlt />
    </button>
          
            {showProfile && (
      <div
            className={`
                absolute z-50 right-0 top-12.5
                w-50 md:w-75
                bg-white border border-gray-200
                rounded-lg shadow-lg p-5
                transform origin-top-right
                transition-all duration-300 ease-out
                ${
                    showProfile
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-90 -translate-y-3 pointer-events-none"
                }
            `}
        >
       <p className="text-[12px] md:text-sm text-gray-500 dark:text-gray-400">
                    Welcome back
                </p>

                <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
                    Hello, {loggedInUser} 👋
                </p>
                  <button
                onClick={handleLogout}
                className="mt-3 text-white bg-red-600 hover:bg-red-700 focus:outline-none font-medium rounded-lg text-[12px] md:text-sm px-4 md:px-5 py-1.5 md:py-2.5"
            >
                Logout
            </button>
    </div>
)}
</div>
        </div> */}


                    <div ref={profileRef} className=" relative">

                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className=" relative w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-all duration-200"
                        >
                            <FaUserAlt />
                        </button>


                        {/* DON'T use {showProfile && (...)} here */}

                        <div
                            className={`
                absolute z-50 right-0 top-12.5
                w-50 md:w-75
                bg-white border border-gray-200
                rounded-lg shadow-lg p-5
                transform origin-top-right
                transition-all duration-300 ease-out
                ${showProfile
                                    ? "opacity-100 scale-100 translate-y-0"
                                    : "opacity-0 scale-90 -translate-y-3 pointer-events-none"
                                }
            `}
                        >

                            <p className="text-[12px] md:text-sm text-gray-500">
                                Welcome back
                            </p>

                            <p className="text-sm md:text-base font-semibold text-gray-900">
                                Hello, {loggedInUser} 👋
                            </p>

                            <button
                                onClick={handleLogout}
                                className="mt-3 text-white bg-red-600 hover:bg-red-700 focus:outline-none font-medium rounded-lg text-[12px] md:text-sm px-4 md:px-5 py-1.5 md:py-2.5"
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </div>

            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h2 className="text-[16px] md:text-2xl font-bold text-gray-900 dark:text-white">
                            Products Lists
                        </h2>

                        <p className="mt-1 text-[12px] md:text-sm text-gray-500 dark:text-gray-400">
                            Here are your products.
                        </p>
                    </div>


                    <button
                        onClick={() => navigate("/create-product")}
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] md:text-sm px-4 md:px-5 py-1.5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        + Add Product
                    </button>

                </div>


                {/* Product Table */}

                {/* Desktop Table */}
                <div className="hidden md:block relative overflow-x-auto bg-white rounded-lg shadow dark:bg-gray-800">

                    <table className="w-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400">

                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>

                                <th className="px-6 py-4 w-[25%]">
                                    Product
                                </th>

                                <th className="px-6 py-4 w-[15%]">
                                    Category
                                </th>

                                <th className="px-6 py-4 w-[15%]">
                                    Price
                                </th>

                                <th className="px-6 py-4 w-[15%]">
                                    Quantity
                                </th>

                                <th className="px-6 py-4 w-[20%] text-center">
                                    Action
                                </th>

                            </tr>
                        </thead>
                        {
                            loadingData ? (<tbody>
                                <tr>
                                    <td className="h-[60vh]" colSpan={5} >
                                        <div className="flex items-center justify-center h-full">
                                            <div className="loader"></div>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>) :
                                (
                                    <>
                                        <tbody>

                                            {products.map((product) => (

                                                <tr
                                                    key={product._id}
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                >

                                                    {/* Product */}
                                                    <td className="px-6 py-4">

                                                        <p className="font-semibold text-gray-900 dark:text-white">
                                                            {product.name}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                                            {product.description}
                                                        </p>

                                                    </td>


                                                    {/* Category */}
                                                    <td className="px-6 py-4">

                                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
                                                            {product.category}
                                                        </span>

                                                    </td>


                                                    {/* Price */}
                                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                        ₹{product.price.toLocaleString()}
                                                    </td>


                                                    {/* Quantity */}
                                                    <td className="px-6 py-4">
                                                        {product.quantity}
                                                    </td>


                                                    {/* Actions */}
                                                    <td className="px-6 py-4">

                                                        <div className="flex justify-center items-center gap-3">

                                                            <button
                                                                onClick={() => navigate(`/update-product/${product._id}`, {
                                                                    state: { product }
                                                                })}
                                                                title="Edit"
                                                                className="p-2 text-blue-600 rounded-lg hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-gray-700"
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                            onClick={()=>deleteProduct(product._id)}
                                                                title="Delete"
                                                                className="p-2 text-red-600 rounded-lg hover:bg-red-100 dark:text-red-400 dark:hover:bg-gray-700"
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                        <tbody>
                                            <tr>
                                                <td colSpan={5}>
                                                    {products.length === 0 && (
                                                        <div className="bg-white rounded-lg shadow p-6 text-center  h-[50vh] flex justify-center items-center">
                                                            <p className="text-black font-medium sm:text-xl">
                                                                No products found.
                                                            </p>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </>

                                )
                        }


                    </table>

                </div>


                {/* Mobile Cards */}
                <div className="block md:hidden ">

                    {
                        loadingData ? (
                            <div className="flex items-center justify-center h-[50vh]">
                                <div className="loader"></div>
                            </div>
                        ) :
                            (
                                <div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        {products.map((product) => (

                                            <div
                                                key={product._id}
                                                className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                                            >

                                                <div className="flex flex-col justify-between p-5 h-[220px]">

                                                    {/* Product Name */}
                                                    <div className="flex items-start justify-between gap-4">

                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                                {product.name}
                                                            </h3>

                                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                                                {product.description}
                                                            </p>
                                                        </div>

                                                        {/* Category */}
                                                        <span className="shrink-0 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
                                                            {product.category}
                                                        </span>

                                                    </div>


                                                    <div>
                                                        {/* Product Details */}
                                                        <div className="flex justify-between ">

                                                            <div>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                    Price
                                                                </p>

                                                                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                                                    ₹{product.price.toLocaleString()}
                                                                </p>
                                                            </div>


                                                            <div>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                    Quantity
                                                                </p>

                                                                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                                                    {product.quantity}
                                                                </p>
                                                            </div>

                                                        </div>


                                                        {/* Actions */}
                                                        <div className="flex gap-3 mt-4 border-t border-gray-200 dark:border-gray-700">

                                                            <button
                                                                onClick={() => navigate(`/update-product/${product._id}`, {
                                                                    state: { product }
                                                                })}
                                                                className="flex-1 text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                className="flex-1 text-red-600 border border-red-600 hover:bg-red-50 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:text-red-400 dark:border-red-400 dark:hover:bg-gray-700"
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                    {products.length === 0 && (
                                        <div className="bg-white rounded-lg shadow p-6 text-center dark:bg-gray-800 h-[50vh] flex justify-center items-center">
                                            <p className="text-black font-medium sm:text-xl">
                                                No products found.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )
                    }

                </div>


            </div>

        </section>
    );
};

export default Home;

