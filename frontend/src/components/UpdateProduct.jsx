
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const product = location.state?.product;

    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        quantity: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "quantity" || name === "price") {
            if (!/^\d*$/.test(value)) {
                return;
            }
        }
        setForm({
            ...form,
            [name]: value,
        });
            let error = "";

    if (name === "name") {
        if (!value.trim()) {
        error = "Name is required";
    } 
    else if (value.trim().length < 3) {
        error = "Name must be at least 3 characters";
    }
    }

    if (name === "price") {
       if (value === "") {
    error = "Price is required";
} 
else if (Number(value) < 1) {
    error = "Price must be at least 1";
}
    }

    if (name === "category") {
        if (!value.trim()) {
            error = "Category is required";
        }
    }

    if (name === "quantity") {
          if (value === "") {
    error = "Quantity is required";
} 
else if (Number(value) < 1) {
    error = "Quantity must be at least 1";
}
    }

    if (name === "description") {
        if (!value.trim()) {
        error = "Description is required";
    } 
    else if (value.trim().length < 10) {
        error = "Description must be at least 10 characters";
    }
    }

    setErrors((prev) => ({
        ...prev,
        [name]: error
    }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();

    if (!isValid) {
        return;
    }

        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `http://localhost:5000/products/${id}`,
                form,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);

                setForm({
                    name: "",
                    price: "",
                    category: "",
                    quantity: "",
                    description: "",
                });
                setTimeout(() => {
                    navigate("/")
                }, 1000)
            }
        } catch (error) {
            console.log(error.response?.data);

            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };
    useEffect(() => {
        if (product) {
            setForm({
                name: product.name,
                price: product.price,
                category: product.category,
                quantity: product.quantity,
                description: product.description,
            });
        }
    }, [product]);
const validateForm = () => {

    const newErrors = {};

    if (!form.name.trim()) {
        newErrors.name = "Name is required";
    } else if (form.name.trim().length < 3) {
        newErrors.name = "Name must be at least 3 characters";
    }

    if (
        form.price === "" ||
        form.price === null ||
        form.price === undefined
    ) {
        newErrors.price = "Price is required";
    } else if (Number(form.price) < 1) {
        newErrors.price = "Price must be at least 1";
    }

    if (!form.category.trim()) {
        newErrors.category = "Category is required";
    }

    if (
        form.quantity === "" ||
        form.quantity === null ||
        form.quantity === undefined
    ) {
        newErrors.quantity = "Quantity is required";
    } else if (Number(form.quantity) < 1) {
        newErrors.quantity = "Quantity must be at least 1";
    }

    if (!form.description.trim()) {
        newErrors.description = "Description is required";
    } else if (form.description.trim().length < 10) {
        newErrors.description =
            "Description must be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};
    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-10">

                {/* Heading */}
                <div className="w-full sm:max-w-2xl mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Update Product
                        </h1>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Add your product details below.
                        </p>
                    </div>
                    <Link
                        to={'/'}
                        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-[12px] md:text-sm px-4 py-1.5 md:px-5 md:py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Home
                    </Link>
                </div>

                {/* Form Card */}
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-2xl dark:bg-gray-800 dark:border-gray-700">

                    <div className="p-6 space-y-6 sm:p-8">

                        <form
                            className="space-y-6"
                            onSubmit={handleSubmit}
                        >

                            {/* Product Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                                            {errors.name && (
    <p className="text-red-500 text-[12px] md:text-sm font-medium mt-1">
        {errors.name}
    </p>
)}
   
                            </div>

                            {/* Price + Quantity */}
                            <div className="grid gap-6 md:grid-cols-2">

                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Price
                                    </label>

                                    <input
                                        type="text"
                                        name="price"
                                        id="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="Enter price"
                                     
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                                                {errors.price && (
    <p className="text-red-500 text-[12px] md:text-sm font-medium mt-1">
        {errors.price}
    </p>
)}
   
                                </div>

                                <div>
                                    <label
                                        htmlFor="quantity"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Quantity
                                    </label>

                                    <input
                                        type="text"
                                        name="quantity"
                                        id="quantity"
                                        value={form.quantity}
                                        onChange={handleChange}
                                        placeholder="Enter quantity"
                                    
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                                                {errors.quantity && (
    <p className="text-red-500 text-[12px] md:text-sm font-medium mt-1">
        {errors.quantity}
    </p>
)}
   
                                </div>

                            </div>

                            {/* Category */}
                            <div>
                                <label
                                    htmlFor="category"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Category
                                </label>

                                <select
                                    name="category"
                                    id="category"
                                    value={form.category}
                                    onChange={handleChange}
                                  
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="">
                                        Select category
                                    </option>

                                    <option value="Mobile">
                                        Mobile
                                    </option>

                                    <option value="Laptop">
                                        Laptop
                                    </option>

                                    <option value="Television">
                                        Television
                                    </option>

                                    <option value="Accessories">
                                        Accessories
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>
                                </select>
                                                                                                {errors.category && (
    <p className="text-red-500 text-[12px] md:text-sm font-medium mt-1">
        {errors.category}
    </p>
)}
   
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    id="description"
                                    rows="5"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Enter product description"
                               
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                                />
                                                                                                {errors.description && (
    <p className="text-red-500 text-[12px] md:text-sm font-medium mt-1">
        {errors.description}
    </p>
)}
   
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Update Product
                            </button>

                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpdateProduct;