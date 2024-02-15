import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { RiCouponLine } from "react-icons/ri";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
  AiOutlineTags,
} from "react-icons/ai";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toastify from "../../utils/toastify.jsx";
import { logout } from "../../features/Auth/authApiSlice.js";
import { setMessageEmpty } from "../../features/Auth/AuthSlice.js";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { isError, message, user, isLoading } = useSelector(
    (state) => state.auth
  );

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  // log out administrators
  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (isError) {
      toastify("error", isError);
      dispatch(setMessageEmpty());
    }
    if (message) {
      toastify("success", message);
      dispatch(setMessageEmpty());
    }
  }, [isError, message]);
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical">Focal</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key == "signout") {
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "",
                icon: <AiOutlineDashboard className="fs-4" />,
                label: "Dashboard",
              },
              {
                key: "customers",
                icon: <AiOutlineUser className="fs-4" />,
                label: "Customers",
              },
              {
                key: "catalog",
                icon: <AiOutlineShoppingCart className="fs-4" />,
                label: "Catalog",
                children: [
                  {
                    key: "product",
                    icon: <AiOutlineShoppingCart className="fs-4" />,
                    label: "Add Product",
                  },
                  {
                    key: "list-product",
                    icon: <AiOutlineShoppingCart className="fs-4" />,
                    label: "Product List",
                  },
                  {
                    key: "brand",
                    icon: <SiBrandfolder className="fs-4" />,
                    label: "Brand",
                  },
                  {
                    key: "list-brand",
                    icon: <SiBrandfolder className="fs-4" />,
                    label: "Brand List ",
                  },
                  {
                    key: "category",
                    icon: <BiCategoryAlt className="fs-4" />,
                    label: "Category",
                  },
                  {
                    key: "list-category",
                    icon: <BiCategoryAlt className="fs-4" />,
                    label: "Category List",
                  },
                  {
                    key: "color",
                    icon: <AiOutlineBgColors className="fs-4" />,
                    label: "Color",
                  },
                  {
                    key: "list-color",
                    icon: <AiOutlineBgColors className="fs-4" />,
                    label: "Color List",
                  },
                  {
                    key: "tag",
                    icon: <AiOutlineTags className="fs-4" />,
                    label: "Tag",
                  },
                  {
                    key: "tag-list",
                    icon: <AiOutlineTags className="fs-4" />,
                    label: "Tag List",
                  },
                ],
              },
              {
                key: "orders",
                icon: <FaClipboardList className="fs-4" />,
                label: "Orders",
              },
              {
                key: "coupon",
                icon: <RiCouponLine className="fs-4" />,
                label: "Coupon",
                children: [
                  {
                    key: "add-coupon",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Coupon",
                  },
                  {
                    key: "coupon-list",
                    icon: <RiCouponLine className="fs-4" />,
                    label: "Coupon List",
                  },
                ],
              },
              {
                key: "blogs",
                icon: <FaBloggerB className="fs-4" />,
                label: "Blogs",
                children: [
                  {
                    key: "blog",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Blog",
                  },
                  {
                    key: "blog-list",
                    icon: <FaBloggerB className="fs-4" />,
                    label: "Blog List",
                  },
                  {
                    key: "blog-category",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Blog Category",
                  },
                  {
                    key: "blog-category-list",
                    icon: <FaBloggerB className="fs-4" />,
                    label: "Blog Category List",
                  },
                ],
              },
              {
                key: "enquiries",
                icon: <FaClipboardList className="fs-4" />,
                label: "Enquiries",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            className="d-flex justify-content-between ps-1 pe-5"
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 45,
                height: 40,
                marginLeft: 10,
              }}
            />
            <div className="d-flex gap-4 align-items-center">
              <div className="position-relative">
                <IoIosNotifications className="fs-4" />
                <span className="badge bg-warning rounded-circle p-1 position-absolute">
                  3
                </span>
              </div>
              <div className="d-flex gap-3 align-items-center dropdown">
                <div>
                  <img
                    width={32}
                    height={32}
                    src={
                      user?.photo
                        ? user?.photo?.url
                        : "https://i.ibb.co/DDbjkbw/profile.png"
                    }
                    alt={user?.slug}
                  />
                </div>
                <div
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <h5 className="mb-0">
                    {user &&
                      `${user?.firstName?.toUpperCase()} ${user?.lastName?.toUpperCase()}`}
                  </h5>
                  <p className="mb-0">{user && user?.email}</p>
                </div>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <Link
                      className="dropdown-item py-1 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      to="/profile"
                    >
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item py-1 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                    >
                      Signout
                    </button>
                  </li>
                </div>
              </div>
            </div>
          </Header>

          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
