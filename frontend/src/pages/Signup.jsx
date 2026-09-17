import React ,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";
export default function Signup() {
      const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
      const [form, setForm] = useState({
            name:'',
            email: '',
            password: ''
        });
          const [errors, setErrors] = useState({
            name:'',
            email: '',
            password: ''
        });
        const handleChange = (e) => {
            const { name, value } = e.target;
            setForm({ ...form, [name]: value });
        };
    
const handleError = (error) => {
    const status = error.response?.status;
 const message = error.response?.data?.error?.details?.[0]?.message;

    if (status === 400) {
        toast.error(message || "Validation error");
    }
    else if (status === 409) {
        toast.error(message || "User already exists");
    }
    else if (status === 500) {
        toast.error(message || "Internal Server Error");
    }
    else {
        toast.error("Something went wrong");
    }
};


        const handleSubmit = async(e) => {
            e.preventDefault();
            let newErrors = {
            email: '',
            password: ''
        };

        let isValid = true;
    if (!form.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        if (!form.password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        }


        setErrors(newErrors);

        if (!isValid) {
            return;
        }
         setLoading(true);
           try {
            const response = await axios.post(
                "http://localhost:5000/auth/signup",
                form
            );
        if(response.data.success){
 console.log(response.data);
             setLoading(false);
              toast.success("Signup Successfully")
              navigate('/login')
        }
           

    
        } catch (error) {
          handleError(error);
            setLoading(false);
        }
        };
  return (
  <>
  <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                 <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
              value={form.name}
               onChange={handleChange}
            />
                                       {errors.name && (
    <p className="text-red-500 text-[12px] md:text-sm font-medium mt-1">
        {errors.name}
    </p>
)}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required=""
              value={form.email}
           onChange={handleChange}
            />
                                        {errors.email && (
    <p className="text-red-500 text-[12px] md:text-sm font-medium mt-1">
        {errors.email}
    </p>
)}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
               value={form.password}
                                         onChange={handleChange}
            />
                                         {errors.password && (
    <p className="text-red-500 text-[12px] md:text-sm font-medium mt-1">
        {errors.password}
    </p>
)}
          </div>
     
          <button
             disabled={loading}
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
          {loading ? (
        <>
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            Creating Account...
        </>
    ) : (
        "Signup"
    )}
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
             to={'/login'}
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
</>
  )
}
