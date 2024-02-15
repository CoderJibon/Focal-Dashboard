import MainLayout from "../components/MainLayout/MainLayout.jsx";
import AddBlog from "../pages/AddBlog/AddBlog.jsx";
import AddBlogCat from "../pages/AddBlogCat/AddBlogCat.jsx";
import AddBrand from "../pages/AddBrand/AddBrand.jsx";
import AddCat from "../pages/AddCat/AddCat.jsx";
import AddColor from "../pages/AddColor/AddColor.jsx";
import AddCoupon from "../pages/AddCoupon/AddCoupon.jsx";
import AddProduct from "../pages/AddProduct/AddProduct.jsx";
import BlogCatList from "../pages/BlogCatList/BlogCatList.jsx";
import BlogList from "../pages/BlogList/BlogList.jsx";
import BrandList from "../pages/BrandList/BrandList.jsx";
import BrandSingle from "../pages/BrandSingle/BrandSingle.jsx";
import CategoryList from "../pages/CategoryList/CategoryList.jsx";
import ColorList from "../pages/ColorList/ColorList.jsx";
import CouponList from "../pages/CouponList/CouponList.jsx";
import Customers from "../pages/Customers/Customers.jsx";
import DashBoard from "../pages/DashBoard/DashBoard.jsx";
import Enquiries from "../pages/Enquiries/Enquiries.jsx";
import Orders from "../pages/Orders/Orders.jsx";
import ProductList from "../pages/ProductList/ProductList.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import SingleBlog from "../pages/SingelBlog/SingelBlog.jsx";
import SingleBlogCat from "../pages/SingleBlogCat/SingleBlogCat.jsx";
import SingleCoupon from "../pages/SingleCoupon/SingleCoupon.jsx";
import SingleProduct from "../pages/SingleProduct/SingleProduct.jsx";
import SingleTag from "../pages/SingleTag/SingleTag.jsx";
import TagList from "../pages/TagList/TagList.jsx";
import UpdateColor from "../pages/UpdateColor/UpdateColor.jsx";
import ViewOrder from "../pages/ViewOrder/ViewOrder.jsx";
import AddTag from "../pages/addTag/AddTag.jsx";
import ProductCategorySingle from "../pages/productCategorySingle/productCategorySingle.jsx";
import PrivateGard from "./PrivateGard.jsx";

//private router
const privateRouter = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <PrivateGard />,
        children: [
          {
            path: "/",
            element: <DashBoard />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "enquiries",
            element: <Enquiries />,
          },
          {
            path: "blog",
            element: <AddBlog />,
          },
          {
            path: "blog-list",
            element: <BlogList />,
          },
          {
            path: "blog-list/:slug",
            element: <SingleBlog />,
          },
          {
            path: "coupon-list",
            element: <CouponList />,
          },
          {
            path: "add-coupon",
            element: <AddCoupon />,
          },
          {
            path: "coupon-list/:id",
            element: <SingleCoupon />,
          },
          {
            path: "blog-category",
            element: <AddBlogCat />,
          },
          {
            path: "blog-category-list",
            element: <BlogCatList />,
          },
          {
            path: "blog-category-list/:slug",
            element: <SingleBlogCat />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "order/:id",
            element: <ViewOrder />,
          },
          {
            path: "/customers",
            element: <Customers />,
          },
          {
            path: "list-color",
            element: <ColorList />,
          },
          {
            path: "list-color/:id",
            element: <UpdateColor />,
          },
          {
            path: "color",
            element: <AddColor />,
          },
          {
            path: "color/:id",
            element: <AddColor />,
          },

          {
            path: "list-category",
            element: <CategoryList />,
          },
          {
            path: "list-category/:slug",
            element: <ProductCategorySingle />,
          },
          {
            path: "category",
            element: <AddCat />,
          },

          {
            path: "category/:id",
            element: <AddCat />,
          },
          {
            path: "list-brand",
            element: <BrandList />,
          },
          {
            path: "brand",
            element: <AddBrand />,
          },
          {
            path: "list-brand/:id",
            element: <BrandSingle />,
          },
          {
            path: "tag-list",
            element: <TagList />,
          },
          {
            path: "tag",
            element: <AddTag />,
          },
          {
            path: "tag-list/:id",
            element: <SingleTag />,
          },
          {
            path: "list-product",
            element: <ProductList />,
          },
          {
            path: "product",
            element: <AddProduct />,
          },
          {
            path: "list-product/:slug",
            element: <SingleProduct />,
          },
        ],
      },
    ],
  },
];

//export private router
export default privateRouter;
